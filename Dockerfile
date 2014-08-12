FROM ubuntu:14.04
MAINTAINER Neale Swinnerton <neale@mastodonc.com>

RUN apt-get update
RUN apt-get -y install ruby-dev make gcc g++
RUN gem install jekyll therubyracer
RUN mkdir /vagrant
WORKDIR /vagrant
EXPOSE 4000

CMD ["jekyll","serve"]
