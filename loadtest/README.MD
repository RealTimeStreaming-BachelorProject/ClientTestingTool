# How to install artillery

npm install -g artillery

How to get cpu and memory usage CSV file on the containers you are monitoring:
`echo CONTAINERNAME,CPUPERCENTAGE,MEMPERCENTAGE >> stats.csv && while true; do docker stats --format "{{.Name}},{{.CPUPerc}},{{.MemPerc}}" --no-stream | tee --append stats.csv; sleep 1; done`
This will create a file 'stats.csv' with the Containername,CPUPercentage,MemoryPercentage. It collects data every one second.
REMEMBER TO CHANGE FILENAME
