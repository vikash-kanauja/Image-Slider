const imageSection = document.getElementById("image-parent");
const sliderDots = document.getElementById("slides_dots");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".prev");
const slidesContainer = document.getElementById("slides");
const numberOfImage = document.getElementById("number_of_img");

// Array of image URLs
const arrayOfImages = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
];

let imageIndex = 0;
let imageSliderDots = [];
// Create dots based on number of frame . 
const createDot = () => {
  const numberOfDots = Math.ceil(arrayOfImages.length / (numberOfImage.selectedIndex + 1));
  for (let i = 0; i < numberOfDots; i++) {
  const dot = document.createElement("button");
  dot.classList.add(
    "btn",
    "w-1",
    "h-1",
    "ml-1",
    "rounded-[50%]",
    "bg-gray-300",
    "hover:bg-blue-400",
    "2xl:w-4", "2xl:h-4",
    "xl:w-3", "xl:h-3",
    "md:w-2", "md:h-2"
  );
  sliderDots.appendChild(dot);
  imageSliderDots.push(dot);
  // Add click event listener to the dot
  dot.addEventListener("click", () => {
    stopAutoSlider();      //stop outo slide when user click dot
    imageIndex = i;      // Set counter to clicked index
    imageSlide();       // Slide to the selected image
    showAndHideArrow();
  });
}
};
createDot();


// Variables to store image references and slide counter
let allImage;

// Function to add images to the slides
  arrayOfImages.forEach((img, index) => {
    const fromLeft = index * 100;
    const image = document.createElement("img");
    image.src = img;
    image.classList.add(
      "img",
      "w-full",
      "h-[100%]",
      "object-cover",
      "absolute",
      "mr-2",
      `left-[${fromLeft}%]`,
      "transition-transform",
      "duration-1000",
      "ease-in-out"
    );
    // Append image to the image section
    imageSection.appendChild(image);
  });
  

  // Get all image elements
  allImage = document.querySelectorAll("img");
  // Event listen for select box that will be number of image in one frame
  numberOfImage.addEventListener("change", (e) => {
    e.preventDefault();
    sliderDots.innerHTML = "";
    imageSliderDots = [];
    imageIndex = 0;
    count = 0;
    numberOfDots = 0;
    createDot();
    imageSlide();
    showAndHideArrow();
  });

// Function to show/hide navigation arrows based on slide position
const showAndHideArrow = () => {
  // Show or hide next button based on slide position
  (imageIndex === imageSliderDots.length - 1) ? nextButton.classList.add("hidden") : nextButton.classList.remove("hidden");
  // Show or hide previous button based on slide position
  (imageIndex === 0) ? previousButton.classList.add("hidden") : previousButton.classList.remove("hidden");
}

const dots = sliderDots.querySelectorAll("button");
// Function to slide images

let count = 0;
const imageSlide = () => {
  const numberOfSlideCycle = Math.ceil(arrayOfImages.length / (numberOfImage.selectedIndex + 1));
  const frameWidthPercentage = 100 / (numberOfImage.selectedIndex + 1);

  // slide frame based on select option
  allImage.forEach((slide, i) => {
    slide.style.width = `${frameWidthPercentage}%`;
    slide.style.left = `${i * frameWidthPercentage}%`;
    if ((numberOfImage.selectedIndex + 1) == 3 && count < numberOfSlideCycle) {
      slide.style.transform = `translateX(-${imageIndex * 300}%)`;
    } else if ((numberOfImage.selectedIndex + 1) == 2 && count < numberOfSlideCycle) {
      slide.style.transform = `translateX(-${imageIndex * 200}%)`;
    } else if ((numberOfImage.selectedIndex + 1) == 1 && count < numberOfSlideCycle) {
      slide.style.transform = `translateX(-${imageIndex * 100}%)`;
    } else {
      return;
    }
  });
  if (count >= numberOfSlideCycle) {
    count = 0;
  } else {
    count++;
  }

  sliderDotHandler();
  showAndHideArrow();
};
// This function are use to change the dots color
const sliderDotHandler = () => {
  imageSliderDots.forEach((dot, index) => {
    (imageIndex) === index
      ? dot.classList.add("bg-blue-400") 
      : dot.classList.remove("bg-blue-400");
  });
};

// Function to go to the previous slide
const goToPreviousSlide = () => {
  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = 0;
  }
  imageSlide();
  showAndHideArrow();
};

// Function to go to the next slide
const goToNextSlide = () => {
  if (imageIndex >= imageSliderDots.length - 1) {
       return imageIndex;
  }
  imageIndex++;
  imageSlide();
  showAndHideArrow();
};

// Reference variable for auto slide interval
let intervalRef=null;

// function for auto image Slide after 3s delay. 
const autoSlide = () => {
  intervalRef = setInterval(() => {
    if (imageIndex === imageSliderDots.length - 1) imageIndex = -1;
    imageIndex++;
    imageSlide();
    count = 0;
    showAndHideArrow();
  }, 3000);
};

// Start auto slide that are use many time time
autoSlide();

// Event listener for next button click
nextButton.addEventListener("click", () => {
  stopAutoSlider();
  goToNextSlide();
  imageSlide();
});

// Event listener for pevious button click
previousButton.addEventListener("click", () => {
  stopAutoSlider();
  goToPreviousSlide();
  imageSlide();
});
//stop outoslider when user click left or right button
const stopAutoSlider = () => {
  clearInterval(intervalRef);
}
// Function to initialize the slider when the page loads
const initializeSlider = () => {
  showAndHideArrow()
  dots[0].classList.add("bg-blue-400");
};
// Call the initializeSlider function when the page loads
window.addEventListener('load', initializeSlider);

//Stop slide when mouse hover

slidesContainer.addEventListener("mouseenter",()=>{
  clearInterval(intervalRef);

})
slidesContainer.addEventListener("mouseleave",()=>{
  autoSlide();
})