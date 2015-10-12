#!/bin/bash

#Call with username, password and machine name
azure vm create $3 -o vmdepot-51465-1-32 -l "West Europe" $1 $2 --ssh
azure vm endpoint create-multiple $3  80:80:tcp::::::::::,443:443:tcp::::::::::
ssh-copy-id -i ~/.ssh/id_rsa.pub $1@$3.cloudapp.net
