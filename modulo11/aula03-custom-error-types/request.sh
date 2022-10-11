echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}' #correct!


echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "19"}' #incorrect!

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "Bat", "age": "50"}' #incorrect!

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "Bat"}' #incorrect!