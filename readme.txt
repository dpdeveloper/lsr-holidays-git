# LSR Holidays Content Server

* David Anderson
* 2013-02-26

###Setting up the ssh keys

Please see [this github article for setup options](https://help.github.com/articles/managing-deploy-keys). My workflow is with a github dummy account. I add the ssh keys to this and add the account as a collaborator to the account

1. SSH to your server
2. Change to the ssh key directory (cd ~/.ssh)
3. Generate a key (/usr/bin/ssh-keygen -t rsa -C "your_email@youremail.com")
4. Hit enter to use the default file and leave the passcode blank. Yes this does make things more vulnerable but it is an absolute pain otherwise. Provided the private key stays on the server and nowhere else, you'll be fine.
5. Login via ftp or similar and open your public key file (probably at .ssh/id_rsa.pub)
6. Paste this into you ssh keys on github