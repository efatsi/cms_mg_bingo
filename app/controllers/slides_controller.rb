class SlidesController < ApplicationController
  ICON_NUMS = [1, 4, 7, 10, 12, 16, 19, 22, 25, 28, 31, 34, 37, 39, 41, 44, 47, 51, 53, 57, 59, 61, 63, 65, 68, 73, 77]

  def index
    @icons = ICON_NUMS.each_with_index.map do |num, i|
      next_num = ICON_NUMS[i + 1] || 81
      photos = ((num + 1)...(next_num)).map { |n| "/assets/bingo-slides/Untitled.#{'%03d' % n}.jpeg" }
      {
        file: "/assets/bingo-slides/Untitled.#{'%03d' % num}.jpeg",
        photos: photos
      }
    end

    puts "FATSI"
    puts @icons
    puts "FATSI"
  end
end
