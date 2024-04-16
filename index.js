const imageSection = document.getElementById("image-parent");
const dotsContainer = document.getElementById("slides_dots");
const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".prev");
const slidesContainer = document.getElementById("slides")
// Array of image URLs
const arrayOfImages = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
];
// Variables to store image references and slide counter
let allImage;
let slideCounter = 0;

// Function to add images to the slides
const addImageInSlides = () => {
  arrayOfImages.forEach((img, index) => {
    const fromLeft = index * 100;
    const image = document.createElement("img");
    // image.src = img.imageUrl;
    image.src = img;
    image.classList.add(
      "img",
      "w-full",
      "h-[100%]",
      "object-cover",
      "rounded-md",
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
  allImage = document.getElementsByTagName("img");
};

// Call the function to add images to slides
addImageInSlides();

// Function to show/hide navigation arrows based on slide position
const showAndHideArrow = () => {
// Show or hide next button based on slide position
  (slideCounter === allImage.length - 1) ? nextButton.classList.add("hidden") : nextButton.classList.remove("hidden");
  // Show or hide previous button based on slide position
  (slideCounter === 0) ? previousButton.classList.add("hidden") : previousButton.classList.remove("hidden");
}


// Function to slide images
const slideImage = () => {
  for (let i = 0; i < allImage.length; i++) {
    let count = slideCounter * 100;
    allImage[i].style.transform = `translateX(-${count}%)`;
  }
};

// Function to go to the previous slide
const goPreviousSlide = () => {
  slideCounter--;
  if (slideCounter < 0) {
    slideCounter = 0;
  }
  showAndHideArrow();
  slideImage();
};

// Function to go to the next slide
const goNextSlide = () => {
  slideCounter++;
  if (slideCounter > arrayOfImages.length - 1) {
    slideCounter = arrayOfImages.length - 1;
  }
  showAndHideArrow();
  slideImage();
};

// Reference variable for auto slide interval
let intervalRef

// function for auto image Slide after 5s delay. 
const autoSlide = () => {
  intervalRef = setInterval(() => {
    slideCounter++;
    showAndHideArrow();
    if (slideCounter >= arrayOfImages.length) {
      slideCounter = 0;
    }
    showAndHideArrow();
    highlightDot(slideCounter)
    slideImage();
  }, 5000);
};

// Start auto slide
autoSlide();

// Event listener for next button click
nextButton.addEventListener("click", () => {
  goNextSlide();
  highlightDot(slideCounter);
});

// Event listener for pevious button click
previousButton.addEventListener("click", () => {
  goPreviousSlide();
  highlightDot(slideCounter);
});

// Create dots corresponding to each image
arrayOfImages.forEach((img, index) => {
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
  dot.dataset.index = index; // Store index information in dataset
  dotsContainer.appendChild(dot);

  // Add click event listener to each dot
  dot.addEventListener("click", (e) => {
    const clickedIndex = parseInt(e.target.dataset.index);
    slideCounter = clickedIndex; // Set counter to clicked index
    slideImage();// Slide to the selected image
    highlightDot(slideCounter)
  });
});

// Function to highlight the current dot
const highlightDot = (index) => {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("bg-blue-400"); // Add active class to current dot
    } else {
      dot.classList.remove("bg-blue-400"); // Remove active class from other dots
    }
  });
};

// Function to initialize the slider when the page loads
const initializeSlider = () => {
  slideImage(); // Show the first image
  highlightDot(slideCounter); // Highlight the corresponding dot
  showAndHideArrow()

};

// Call the initializeSlider function when the page loads
window.addEventListener('load', initializeSlider);

// Event listener for next button hover
previousButton.addEventListener("mouseenter", () => {
  clearInterval(intervalRef);
})
// Event listener for previous button hover
previousButton.addEventListener("mouseleave", () => {
  autoSlide();
})

// Event listener for next button remove hover
nextButton.addEventListener("mouseenter", () => {
  clearInterval(intervalRef);
})

// Event listener for next button remove hover
nextButton.addEventListener("mouseleave", () => {
  //  intervalRef= setInterval(autoSlide, 5000);
  autoSlide();
})

// Event listener for dots button remove hover
dotsContainer.addEventListener("mouseenter", () => {
  clearInterval(intervalRef);
})

dotsContainer.addEventListener("mouseleave", () => {
  autoSlide();
})

