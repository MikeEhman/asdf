C:\Chutzpah\chutzpah.console.exe test.js /teamcity
call git branch master
call git checkout master
call git merge --no-ff develop
call git pull origin master
call git commit -m "Processed"
call git push origin master