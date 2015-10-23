function array_factorcir(x1,phi,phi_desired,distance,dim){
//As the function name signifies here the array factor is calculated 
 
var pi=3.141592654;
var  y=0;
var  y1=0;
//   for i1=1:dim/2
//       delphi=2*pi*(i1-1)/dim;
//       shi=cos(phi-delphi)-cos(phi_desired*(pi/180)-delphi);
//       shi=shi*dim*distance;
//       y=y+x1(i1)*cos(shi+x1(dim/2+i1)*(pi/180));
//   end;
//   y=y*2;
//   y=abs(y);
 

  //for i1=1:dim/2
  for(var i1 = 0; i<dim/2;i1++){
      var delphi=2*pi*(i1-1)/dim;
      var shi=Math.cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi=shi*dim*distance;
      y=y+x1[i1]*Math.cos(shi+x1[dim/2+i1]*(pi/180));
  }
   //for i1=dim/2+1:dim
   for(var i1 = dim/2; i1<dim;i1++){
      var delphi=2*pi*(i1-1)/dim;
      var shi=cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi=shi*dim*distance;
      y=y+x1[i1-dim/2]*Math.cos(shi-x1[i1]*(pi/180));
  }
  //for i1=1:dim/2
  for(var i1 = 0; i1<dim/2;i1++){
      var delphi=2*pi*(i1-1)/dim;
      var shi=Math.cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi=shi*dim*distance;
      y1=y1+x1[i1]*Math.sin(shi+x1[dim/2+i1]*(pi/180));
  }
  //for i1=dim/2+1:dim
  for(var i1 = dim/2;i1<dim;i1++){
      var delphi=2*pi*(i1-1)/dim;
      var shi=Math.cos(phi-delphi)-Math.cos(phi_desired*(pi/180)-delphi);
      shi=shi*dim*distance;
      y1=y1+x1(i1-dim/2)*Math.sin(shi-x1(i1)*(pi/180));
  }
  y=y*y+y1*y1;
  y=Math.sqrt(y);
  
return y;
}




function[y sllreturn bwfn]=antennafunccircular(x1,nullMatrix,phi_desired,distance)
//This function calculates the fitness value of array 'x1' which is returned in 'y'
global directivity

var pi=3.141592654;
var dim=length(x1);
var y=0;
var num_nullMatrix=nullMatrix.length;
var num1=300;

var phi = []

//TODO Crear un vector linea de 0 a 360 con num1 elementos
phi=linspace(0,360,num1);
var phizero=0;
yax = []
yax[0]=array_factorcir(x1,(pi/180)*phi[0],phi_desired,distance,dim);
var maxi=yax;
var phi_ref=1;
//for i=2:num1//This loop finds out the maximum gain 
for(i=1;i<num1;i++){
    yax[i]=array_factorcir(x1,(pi/180)*phi[i],phi_desired,distance,dim);
    if (maxi<yax[i]){
        maxi=yax[i];
        phizero=phi[i];
        phi_ref=i;
    }
}
var maxtem=0;
var count=0;
if (yax[0]>yax(num1) && yax[0]>yax[1])
    count=count+1;
    sidelobes(count)=yax[0];
    sllphi(count)=phi[0];
end
if yax(num1)>yax[0] && yax(num1)>yax(num1-1)
    count=count+1;
    sidelobes(count)=yax(num1);
    sllphi(count)=phi(num1);
end
for i=2:num1-1
    if yax(i)>yax(i+1) && yax(i)>yax(i-1)
        count=count+1;
        sidelobes(count)=yax(i);
        sllphi(count)=phi(i);
    end
end
sidelobes=sort(sidelobes,'descend');
upper_bound=180;
lower_bound=180;
y=sidelobes[1]/maxi;
sllreturn=20*log10(y);
for i=1:num1/2
    if (phi_ref+i)>num1-1
        upper_bound=180;
        break;
    end
    tem=yax(phi_ref+i);
    if yax(phi_ref+i)<yax(phi_ref+i-1) && yax(phi_ref+i)<yax(phi_ref+i+1)
        upper_bound=phi(phi_ref+i)-phi(phi_ref);
        break;
    end;
end

for i=1:num1/2
    
    if (phi_ref-i<2)
        lower_bound=180;
        break;
    end
    tem=yax(phi_ref-i);
    if yax(phi_ref-i)<yax(phi_ref-i-1) && yax(phi_ref-i)<yax(phi_ref-i+1)
        lower_bound=phi(phi_ref)-phi(phi_ref-i);
    break;
    end;
end
bwfn=upper_bound+lower_bound;
// bwfn
//y=maxtem;
y1=0;
for i=1:num_nullMatrix//The objective function for nullMatrix control
    //is calculated here
    y1=y1+(array_factorcir(x1,nullMatrix(i),phi_desired,distance,dim)/maxi);
end;
y2=0;
uavg=trapezoidalcir(x1,0,2*pi,50,phi_desired,distance,dim);
y2=abs(2*pi*maxi*maxi/uavg);
directivity=10*log10(y2);
y3=abs(phizero-phi_desired);
if y3<5
    y3=0;
end
y=0;
if bwfn>80
    y=y+abs(bwfn-80);
end;
// directivity
//y3=abs((phizero-phi_desired)*(pi/180));
//y=y+y1+1/y2+y3;
y=sllreturn+y+y1+y3;