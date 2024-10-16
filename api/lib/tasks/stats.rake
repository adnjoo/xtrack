namespace :app do
  desc "Output Rails stats to docs/stats.txt"
  task stats: :environment do
    # Run rails stats and output to docs/stats.txt
    output = `rails stats`
    File.open('docs/stats.txt', 'w') { |file| file.write(output) }

    # Optional: Print a confirmation message
    puts "Rails stats have been generated and saved to docs/stats.txt"
  end
end