


var antenna = exports;

function array_factorcir(x1, phi, phi_desired, distance, dim) {
/* x1          -> Vector/Array
   phi         -> Number/Scalar
   phi_desired -> Number/Scalar
   distance    -> Number/Scalar
   dim         -> Number/Scalar
*/
//As the function name signifies here the array factor is calculated 
 
var pi = 3.141592654;
var y  = 0;
var y1 = 0;
//   for i1=1:dim/2
//       delphi=2*pi*(i1-1)/dim;
//       shi=cos(phi-delphi)-cos(phi_desired*(pi/180)-delphi);
//       shi=shi*dim*distance;
//       y=y+x1(i1)*cos(shi+x1(dim/2+i1)*(pi/180));
//   end;
//   y=y*2;
//   y=abs(y);
 

  for (var i1=0; i1<dim/2; i1++) {
      var delphi=2*pi*i1/dim;
      var shi=Math.cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi=shi*dim*distance;
      y=y+x1[i1]*Math.cos(shi+x1[dim/2+i1]*(pi/180));
  }

  for (var i1=dim/2; i1<dim; i1++){
      var delphi = 2*pi*i1/dim;
      var shi = Math.cos(phi-delphi) - Math.cos(phi_desired*(pi/180)-delphi);
      shi = shi*dim*distance;
      y = y+x1[i1-dim/2]*Math.cos(shi-x1[i1]*(pi/180));
  }

  for(var i1=0; i1<dim/2; i1++){
      var delphi=2*pi*i1/dim;
      var shi=Math.cos(phi-delphi) - Math.cos(phi_desired*(pi/180)-delphi);
      shi = shi*dim*distance;
      y1 = y1+x1[i1]*Math.sin(shi+x1[dim/2+i1]*(pi/180));
  }

  for(var i1=dim/2; i1<dim; i1++){
      var delphi=2*pi*i1/dim;
      var shi=Math.cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi = shi*dim*distance;
      y1 = y1+x1[i1-dim/2]*Math.sin(shi-x1[i1]*(pi/180));
  }

  y = y*y+y1*y1;
  y = Math.sqrt(y);
  
return y;
}

///////////////////////////////////////////////////////////////////

function trapezoidalcir(x2, upper, lower, N1, phi_desired, distance, dim) {
/* x2          -> Vector/Array
   upper       -> Number/Scalar
   lower       -> Number/Scalar
   N1          -> Number/Scalar
   phi_desired -> Number/Scalar
   distance    -> Number/Scalar
   dim         -> Number/Scalar
*/
//This function performs integration by trapezoidal rule
  var pi = 3.141592654;
  var h  = (upper-lower)/N1;
  var x1 = lower;

  var asdf = array_factorcir(x2, lower, phi_desired, distance, dim);
  var y = [Math.abs(asdf*asdf*Math.sin(lower-pi/2))];

  for (var i=1; i<N1+1; i++) {
      x1 = x1+h;
      asdf = array_factorcir(x2, x1, phi_desired, distance, dim);
      y[i] = Math.abs(asdf*asdf*Math.sin(x1-pi/2));
  }

  var s=0;
  for (i=0; i<N1+1; i++) {
    if (i==0 || i==N1) {
	    s=s+y[i];
    } else {
	    s=s+2*y[i];
    }
  }

 return (h/2)*s;
}

//////////////////////////////////////////////////////////////
/* This function calculates the fitness value of array 'x1' which is returned in 'y'
The returned result is a  ans  object, as defined in TODO */
function antennafunccircular(x1, nullMatrix, phi_desired, distance) {
/* x1          -> Vector/Array
   nullMatrix  -> Vector/Array
   phi_desired -> Number/Scalar
   distance    -> Number/Scalar
*/
  //En Matlab,  directivity  era global
  var directivity;
  var pi=3.141592654;
  var dim=x1.length;
  var y=0;
  var num1=300;
  var sidelobes = [];
  var sllphi = [];

  var upper_bound=180;
  var lower_bound=180;

  var maxtem=0;
  var count=-1;

  var phi = [0];
  for (var i=1; i<num1; i++) {
      phi.push(i*360/(num1-1));
  }

  var phizero=0;
  var phi_ref=0; // or 1?

  var yax = [];
  var maxi;

  yax[0] = array_factorcir(x1, (pi/180)*phi[0], phi_desired, distance, dim);
  maxi=yax[0];

  //This loop finds out the maximum gain 
  for(var i=1; i<num1; i++) {
      yax[i] = (array_factorcir(x1, (pi/180)*phi[i], phi_desired, distance, dim));
      if (maxi<yax[i]) {
          maxi=yax[i];
          phizero=phi[i];
          phi_ref=i;
      }
  }

  if (yax[0]>yax[num1-1] && yax[0]>yax[1]) {
      count = count+1;
      sidelobes[count] = yax[0];
      sllphi[count]=phi[0];
  }

  if (yax[num1-1]>yax[0] && yax[num1-1]>yax[num1-2]) {
      count=count+1;
      sidelobes[count]=yax[num1-1];
      sllphi[count]=phi[num1-1];
  }

  for (var i=1; i<num1-1; i++) {
      if (yax[i]>yax[i+1] && yax[i]>yax[i-1]) {
          count=count+1;
          sidelobes[count]=yax[i];
          sllphi[count]=phi[i];
      }
  }

  sidelobes.sort();
  sidelobes.reverse();

  y=sidelobes[1]/maxi;
  var sllreturn=20*Math.log(y)/Math.log(10);

  for (var i=0; i<num1/2; i++) {
      if ((phi_ref+i)>num1-2) {
          upper_bound=180;
          break;
      }
      tem=yax[phi_ref+i];
      if (yax[phi_ref+i]<yax[phi_ref+i-1] && yax[phi_ref+i]<yax[phi_ref+i+1]) {
          upper_bound=phi[phi_ref+i]-phi[phi_ref];
          break;
      }
  }

  for (var i=0; i<num1/2; i++) {
      if (phi_ref-i<1) {
          lower_bound=180;
          break;
      }
      tem=yax[phi_ref-i];
      if (yax[phi_ref-i]<yax[phi_ref-i-1] && yax[phi_ref-i]<yax[phi_ref-i+1]) {
          lower_bound=phi[phi_ref]-phi[phi_ref-i];
      break;
      }
  }

  var bwfn=upper_bound+lower_bound;
  // console.log(bwfn);
  //y=maxtem;
  var y1=0;

  // The objective function for nullMatrix
  // control is calculated here
  for (i=0; i<nullMatrix.length; i++) {
      y1=y1+(array_factorcir(x1,nullMatrix[i],phi_desired,distance,dim)/maxi);
  }

  var uavg=trapezoidalcir(x1,0,2*pi,50,phi_desired,distance,dim);
  var y2=Math.abs(2*pi*maxi*maxi/uavg);
  directivity=10*Math.log(y2)/Math.log(10);
  var y3=Math.abs(phizero-phi_desired);
  if (y3<5) {
      y3=0;
  }
  y=0;
  if (bwfn>80) {
      y=y+Math.abs(bwfn-80);
  }
  // directivity
  //y3=abs((phizero-phi_desired)*(pi/180));
  //y=y+y1+1/y2+y3;

  y=sllreturn+y+y1+y3;

  var ans = {
    y:y,
    sllreturn:sllreturn,
    bwfn:bwfn
  };

  return ans;
}

antenna.Antenna = antennafunccircular;
antenna.factor = array_factorcir;
antenna.trap = trapezoidalcir;
