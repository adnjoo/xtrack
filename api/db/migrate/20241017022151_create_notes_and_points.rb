class CreateNotesAndPoints < ActiveRecord::Migration[7.0]
  def change
    # Creating the notes table
    create_table :notes do |t|
      t.text :title
      t.boolean :done, default: false
      t.timestamp :done_date
      t.references :user, null: false, foreign_key: true # Foreign key referencing the Devise users table
      
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end

    # Creating the points table
    create_table :points do |t|
      t.integer :points
      t.integer :week
      t.references :user, null: false, foreign_key: true # Foreign key referencing the Devise users table

      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
