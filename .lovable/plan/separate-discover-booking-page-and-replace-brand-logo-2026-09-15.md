# Separate Discover Booking Page and Replace Brand Logo

## What will change
- Create a dedicated **Discover** page for the embedded Cal.com booking experience.
- Point both desktop and mobile **Get Started** buttons to the new Discover page, while keeping VisionLab as its own navigation destination.
- Use the heading **Discover** and the exact supporting line: “Pick a time that works for you, thirty minutes on us.”
- Reduce the blue/glass frame around the calendar to a much thinner treatment.
- Replace the navigation and footer logos with the newly uploaded Create Media logo.
- Generate matching browser favicon and touch-icon files from the uploaded logo and update the page metadata references.

## Technical details
- Add a new React route at `/discover` with the existing dark Cal.com embed.
- Remove the calendar embed from VisionLab so the two destinations are separate.
- Store the uploaded main logo through the project asset system, then import its pointer in navigation and footer.
- Produce small, square favicon files by padding and resizing the same supplied logo without stretching it.
- Verify the Discover page, Get Started navigation, logo rendering, and calendar frame on desktop and mobile-sized layouts.
