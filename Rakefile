require "rubygems"
require 'rake'
require 'rake/minify'

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


Rake::Minify.new(:minifyjs) do
  dir("js") do # we specify only the source directory
    group("soundrad.js") do # the output file name is full path
      add("config.js")
      add("app.js")
      add("services.js")
      add("controllers.js")
    end
  end
end
