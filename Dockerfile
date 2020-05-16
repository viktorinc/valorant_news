FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

#install application for get HW info
RUN apt-get update

# install System.Drawing native dependencies
RUN apt-get update
RUN apt-get install -y --allow-unauthenticated 
RUN apt-get install -y libc6-dev 
RUN apt-get install -y libgdiplus
RUN apt-get install -y libx11-dev 


RUN apt-get install -y mc
RUN apt-get install -y curl
RUN apt-get install -y hwinfo
RUN apt-get install -y busybox
RUN apt-get install -y iputils-ping
RUN apt-get install -y nodejs




#RUN apt-get build-dep libgdiplus
#RUN apt-get install -y libgdiplus
#RUN apt-get install -y --allow-unauthenticated libc6-dev
#RUN apt-get install -y --allow-unauthenticated libc6-dev libgdiplus libx11-dev

#National Language (locale) data
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT false
RUN apt-get install -y locales
RUN locale-gen uk_UA.UTF-8
ENV LC_ALL uk_UA.UTF-8
ENV LANG uk_UA.UTF-8

WORKDIR /app
EXPOSE 80
RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build

RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY ["Project P34.API+Angular/Project P34.API+Angular.csproj", "Project P34.API+Angular/"]
RUN dotnet restore "Project P34.API+Angular/Project P34.API+Angular.csproj"
COPY . .
WORKDIR "/src/Project P34.API+Angular/"
RUN dotnet build "Project P34.API+Angular.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Project P34.API+Angular.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Project P34.API+Angular.dll"]