C:\Chutzpah\chutzpah.console.exe test.js /teamcity
call ssh -T git@github.com
call remote add origin https://github.com/MikeEhman/asdf.git
call git init
call git add .
call git commit -m "asdf"
call git push origin master