require "rubygems"
require 'rake'

desc "Automatically generate site at :4000 for local dev"
task :dev do
  system "node web-server.js"
end # task :dev

desc "Start Sass so that is compiles to css upon file save"
task :sass do
  system "sass --watch sass:."
end # task :sass

desc "Start Sass so that is compiles to css upon file save"
task :minify do
  system "rm style.css && sass --watch sass:. --style compressed"
end # task :minify
