module Api
  class NotesController < ApplicationController
    before_action :authenticate_user!

    def create
      note = current_user.notes.new(note_params)

      if note.save
        render json: { note: note }, status: :created
      else
        render json: { errors: note.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def note_params
      params.require(:note).permit(:title, :done, :done_date)
    end
  end
end
