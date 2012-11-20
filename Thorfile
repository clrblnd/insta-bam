class Jplugin < Thor
  include Thor::Actions

  desc "compile", "Compiles js file to public/"
  def compile
    relative = 'insta-bam.js'
    text = File.read(relative)
    text.gsub!(/Updated at: (.*)/) { |m| m.gsub($1, "#{Time.now}") }
    File.open( relative, "w") { |file| file.puts text }
    run( "closure-compiler --js #{relative} --js_output_file ./public/#{relative.gsub(".js","-min.js")}" )
  end

  class Release < self

    desc "patch", "Release patch version"
    def patch
      git_status = run( '[[ $(git diff --shortstat 2> /dev/null | tail -n1) != "" ]] && echo "dirty"', :capture => true )

      unless git_status =~ /^dirty/
        label   = nil
        version = nil
        parts   = nil

        gsub_file( 'insta-bam.js', /Version[:].+$/) do |match|
          label, version = *match.split(':', 2)
          parts = version.strip.split('.')
          parts[2] = parts[2].to_i + 1
          "#{label}: #{parts.join('.')}"
        end

        run( "git add .; git commit -m '#{label}: #{parts.join('.')}';" )
        run( "git tag -a v#{parts.join('.')} -m '#{label}: #{parts.join('.')}'")

      else
        say( 'Your git branch is not clean', :red )

      end
    end

    desc "minor", "Release minor version"
    def minor
      git_status = run( '[[ $(git diff --shortstat 2> /dev/null | tail -n1) != "" ]] && echo "dirty"', :capture => true )

      unless git_status =~ /^dirty/
        label   = nil
        version = nil
        parts   = nil

        gsub_file( 'insta-bam.js', /Version[:].+$/) do |match|
          label, version = *match.split(':', 2)
          parts = version.strip.split('.')
          parts[1] = parts[1].to_i + 1
          parts[2] = 0
          "#{label}: #{parts.join('.')}"
        end

        run( "git add .; git commit -m '#{label}: #{parts.join('.')}';" )
        run( "git tag -a v#{parts.join('.')} -m '#{label}: #{parts.join('.')}'")

      else
        say( 'Your git branch is not clean', :red )

      end
    end

    desc "major", "Release major version"
    def major
      git_status = run( '[[ $(git diff --shortstat 2> /dev/null | tail -n1) != "" ]] && echo "dirty"', :capture => true )

      unless git_status =~ /^dirty/
        label   = nil
        version = nil
        parts   = nil

        gsub_file( 'insta-bam.js', /Version[:].+$/) do |match|
          label, version = *match.split(':', 2)
          parts = version.strip.split('.')
          parts[0] = parts[0].to_i + 1
          parts[1] = 0
          parts[2] = 0
          "#{label}: #{parts.join('.')}"
        end

        run( "git add .; git commit -m '#{label}: #{parts.join('.')}';" )
        run( "git tag -a v#{parts.join('.')} -m '#{label}: #{parts.join('.')}'")

      else
        say( 'Your git branch is not clean', :red )

      end
    end

  end

end
