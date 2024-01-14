jest.useFakeTimers();
import React from "react";
import renderer from "react-test-renderer";

// Renders a search bar and a list of countries.
it("should render a search bar and a list of countries", () => {
  // Mock dependencies
  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
    useEffect: jest.fn(),
  }));
  jest.mock("axios");
  jest.mock("react-native-reanimated", () => ({
    ...jest.requireActual("react-native-reanimated"),
    SharedTransition: {
      custom: jest.fn(),
    },
    withTiming: jest.fn(),
    Easing: {
      quad: jest.fn(),
    },
  }));
  jest.mock("jotai", () => ({
    ...jest.requireActual("jotai"),
    useAtom: jest.fn(),
  }));
  jest.mock("./atoms/countryAtom", () => ({
    ...jest.requireActual("./atoms/countryAtom"),
    countAtom: jest.fn(),
    countFilteredAtom: jest.fn(),
  }));

  // Import dependencies
  const { useEffect, useState } = require("react");
  const axios = require("axios");
  const {
    SharedTransition,
    withTiming,
    Easing,
  } = require("react-native-reanimated");
  const { useAtom } = require("jotai");
  const { countAtom, countFilteredAtom } = require("./atoms/countryAtom");

  // Import the code-under-test
  const { CountryList } = require("./screens/CountryList");

  // Set up mock data
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockCountries = [{ name: "Country 1" }, { name: "Country 2" }];
  const mockFilteredData = [{ name: "Country 1" }];
  const mockSetCountries = jest.fn();
  const mockSetFilteredData = jest.fn();
  const mockSetSearchText = jest.fn();

  // Set up mock hooks
  useState.mockReturnValueOnce(["", mockSetSearchText]);
  useAtom.mockReturnValueOnce([mockCountries, mockSetCountries]);
  useAtom.mockReturnValueOnce([mockFilteredData, mockSetFilteredData]);
  useEffect.mockImplementationOnce((callback) => callback());

  // Set up mock axios response
  axios.get.mockResolvedValueOnce({ data: mockCountries });

  // Invoke the code-under-test
  const result = CountryList({ navigation: mockNavigation });

  // Assertions
  expect(result).toBeDefined();
  expect(useState).toHaveBeenCalledWith("");
  expect(useAtom).toHaveBeenCalledWith(countAtom);
  expect(useAtom).toHaveBeenCalledWith(countFilteredAtom);
  expect(useEffect).toHaveBeenCalled();
  expect(axios.get).toHaveBeenCalledWith(
    "https://restcountries.com/v3.1/region/africa?fields=name,flags,cca2,cca3,coatOfArms,capital,region,population"
  );
  expect(mockSetCountries).toHaveBeenCalledWith(mockCountries);
  expect(mockSetFilteredData).toHaveBeenCalledWith(mockCountries);
});
