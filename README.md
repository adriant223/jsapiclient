# jsapiclient


In primul rand facem o noua instanta prin GCP, o accesam folosind SSH
Instalam web apache server pe instanta
Editam fisierul index.html cu codul sursa de aici
Ulterior mergem la API&GATEWAY unde adaugam un O2 AUTH KEY, date pe care le folosim unde este specificat la inceputul scriptului
In ultima faza la IAM&ADMIN adaugam contul cu care dorim sa ne autentificam in script, de exemplu atimis@externalworkforce.google.com

Scriptul nu este setat chiar 100% mai modificati sau adaugati dupa preferinte
In nu are un filtru care sa genereze automat alte nume de instante, trebuie modificate manual din cod, de exemplu daca ai creat instanta2 cu disk name 2 trebuie sa modifici ulterior instanta3 disk 3 sau ce nume doresti sa le oferi.
