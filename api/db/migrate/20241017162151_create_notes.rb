class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    # Creating the notes table
    create_table :notes do |t|
      t.text :title
      t.boolean :done, default: false
      t.timestamp :done_date
      t.boolean :archived, default: false # Soft delete flag for archiving
      t.references :user, null: false, foreign_key: true # Foreign key referencing the Devise users table
      
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
