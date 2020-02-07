# RunVisualizer
[Live link](https://mitchellreiss.github.io/RunVisualizer/)
## Background

RunVisualizer is a data visualization tool to help runners visualize their data post-workout. RunVisualizer is designed to prioritize athletes time displaying all the pertinent information on a single page app.

## Functionality MVP

With RunVisualizer athletes will be able to:
* Upload workouts in GPX format
* Display workout physiological data in a line graph
* Display elevation data on a area chart
* Calculates HR training zones and displays tem

## Wireframes

![RunVisualizer_wireframe - 188 x 273](https://user-images.githubusercontent.com/34895686/71630376-77f86b00-2bb7-11ea-9685-88e932668f36.png)

## Architecture and Technologies

This project will be implemented with the following technologies:

* The fit-file-parser library will be used to parse incoming .fit files for workout data
* Javascript will be used for all calculations and analysis of data
* D3 data visualization library will be used for all charts and graphs

The fit-file-parser will allow users to upload a file from their computer and have it parsed on the spot to be displayed. D3 will be utelized to create animated interactive charts and diagrams to better help athletes visualize their workout!


## Implementation Timeline

Day 1: 
* Create file structure
* Complete frontend and backend for HR zone calculations
Day 2: 
* Learn the D3 library
* Create elevation, main physiological data chart and HR zone chart
Day 3:
* Seed app with sample workout data
* Create and stlye all graph controls

