# input csv file ARGV[1]
# output json

require "csv"
require "json"

if __FILE__ == $0
  # input_file = "leads.csv"

  input_file = ARGV[0]
  output_file = File.basename(input_file, ".*") + ".json"

  csv = CSV.read(input_file, :headers => true, :header_converters => :symbol)

  hash = csv.map {|row| row.to_hash }

  File.open(output_file, 'w') { |f| f.write(JSON.pretty_generate(hash)) }

end