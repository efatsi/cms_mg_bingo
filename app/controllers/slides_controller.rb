class SlidesController < ApplicationController
  ICON_NUMS = [1, 4, 7, 10, 12, 16, 19, 22, 25, 28, 31, 34, 37, 39, 41, 44, 47, 51, 53, 57, 59, 61, 63, 65, 68, 73, 77]

  EXTRA_PHOTOS = {
    4  => ["/assets/bingo-slides/schedule.jpeg"],
    51 => ["/assets/bingo-slides/cm-forms.png"],
    63 => ["/assets/bingo-slides/packing-list.png"]
  }

  def index
    @icons = ICON_NUMS.each_with_index.map do |num, i|
      next_num = ICON_NUMS[i + 1] || 81
      photos = ((num + 1)...(next_num)).map { |n| "/assets/bingo-slides/Untitled.#{'%03d' % n}.jpeg" }
      photos += EXTRA_PHOTOS[num] if EXTRA_PHOTOS[num]
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
