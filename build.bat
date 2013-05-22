C:\Chutzpah\chutzpah.console.exe test.js /teamcity
call git config --global user.email nkim412@gmail.com
call git config --global user.name "Nam Hee Kim"
call git remote set-url origin git@github.com:MikeEhman/asdf.git
call git add .
call git status
call git commit -m "teamcity"
call git push origin master