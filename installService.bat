:: GreytipAstra Windows Service Installation
@echo off

set APP_VERSION=4.0.8

:: Remove surrounding quotes from the first parameter
set str=%~1

:: Check GreytipAstra Home parameter
if "%str%" == "" goto missingGreytipAstraHome
set GreytipAstra_HOME=%str%

if "%GreytipAstra_HOME%" == "." SET GreytipAstra_HOME=%CD%

:: Remove surrounding quotes from the second parameter
set str=%~2

:: Check JVM DLL location parameter
if "%str%" == "" goto autoJVM
set JVM_DLL=%str%
goto install
:autoJVM
set JVM_DLL="%GreytipAstra_HOME%\jre\bin\client\jvm.dll"

:install
:: Install the service
echo ----------
echo installing service.. home folder is %GreytipAstra_HOME%
echo using logback configuration %logback%
echo ----------
GreytipAstra.exe //IS//GreytipAstra --DisplayName="Greytip Astra %APP_VERSION%" ^
--Description="GreytipAstra is an Attendance Swipe Transmitter." ^
--StartClass=com.greytip.cougar.asca.WebAppMain --StopClass=com.greytip.cougar.asca.WebAppMain ^
--Classpath="%GreytipAstra_HOME%\asca-%APP_VERSION%.jar;%GreytipAstra_HOME%\lib\*;%GreytipAstra_HOME%\.install4j\*;" --JvmMs=256 --JvmMx=1024 --LogPath="%GreytipAstra_HOME%\log" ^
++JvmOptions=-XX:+HeapDumpOnOutOfMemoryError ^
++JvmOptions=-XX:HeapDumpPath=greytip-asca.hprof ^
++JvmOptions=-Dapplication.version=%APP_VERSION% ^
++JvmOptions=-Duser.language=en ^
++JvmOptions=-Duser.language=US ^
--StartParams="start" --StartPath="%GreytipAstra_HOME%" ^
--StopPath="%GreytipAstra_HOME%" --Jvm=%JVM_DLL% --StartMode=jvm --StopMode=jvm --Startup=auto ^
--StopParams="stop"
EXIT /B

:missingGreytipAstraHome
echo Insert the GreytipAstra Home
goto printUsage

:printUsage
echo usage:
echo     installService GreytipAstra_Home JVM_DLL_location
set errorlev=1 
EXIT /B