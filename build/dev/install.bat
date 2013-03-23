REM build\dev\install.bat

REM Windows Install Script

REM INSTALL STEPS

REM 1) Pull repository
REM 2) Run install.bat
REM 3) Visit \install on the server to complete the process

REM @author: David Anderson
REM @date: 2013-03-23

git submodule update --init


REM copy the install directory

xcopy ..\lib\install\ ..\..\public_html\install\
xcopy ..\lib\install.sql ..\..\public_html\workspace\install.sql


