#!/bin/bash

echo "넓이를 입력하세요: "
read WIDTH

EXT=".jpg"
#WIDTH=10

mkdir ${WIDTH}x${WIDTH} 

total=`expr $WIDTH \* $WIDTH`

for i in $(seq 1 $total)
do

cp ./blue.jpg ./${WIDTH}x${WIDTH}/blue$i$EXT

done
