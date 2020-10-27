/*
 *  Language Selector component to select the languages for translation
 *
 */

import React from "react";
import "styles/LanguageSelector.scss";
import Dropdown from "components/Dropdown/Dropdown";

interface Language {
  value: string;
  text: string;
}

interface Props {
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguageError?: string;
  targetLanguageError?: string;
  onChange: (language: string, type: string) => void;
}

interface State {
  sourceLanguage: string;
  targetLanguage: string;
  sourceLanguages: Language[];
  targetLanguages: Language[];
  sourceLanguageError?: string;
  targetLanguageError?: string;
}

class LanguageSelector extends React.Component<Props, State> {
  state: State = {
    sourceLanguage: this.props.sourceLanguage,
    targetLanguage: this.props.targetLanguage,
    sourceLanguageError: this.props.sourceLanguageError
      ? this.props.sourceLanguageError
      : "",
    targetLanguageError: this.props.targetLanguageError
      ? this.props.targetLanguageError
      : "",
    sourceLanguages: [{ value: "EN", text: "English" }],
    targetLanguages: [
      { value: "DE", text: "German" },
      { value: "FR", text: "French" },
      { value: "IT", text: "Italian" },
      { value: "SP", text: "Spanish" },
    ],
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        sourceLanguage: this.props.sourceLanguage,
        targetLanguage: this.props.targetLanguage,
        sourceLanguageError: this.props.sourceLanguageError
          ? this.props.sourceLanguageError
          : "",
        targetLanguageError: this.props.targetLanguageError
          ? this.props.targetLanguageError
          : "",
      });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    // const text = this.getLanguageName(e.target.value, target.name);

    this.props.onChange(target.value, target.name);
  };

  getLanguageName = (code: string, type: string) => {
    const { sourceLanguages, targetLanguages } = this.state;
    let languages;

    if (type === "sourceLanguage") {
      languages = sourceLanguages;
    } else if (type === "targetLanguage") {
      languages = targetLanguages;
    } else {
      return "";
    }

    for (let language of languages) {
      if (language.value === code) {
        return language.text;
      }
    }

    return "";
  };

  render() {
    const {
      sourceLanguage,
      targetLanguage,
      sourceLanguages,
      targetLanguages,
      targetLanguageError,
      sourceLanguageError,
    } = this.state;

    return (
      <div className="language">
        <Dropdown
          className="language__dropdown"
          label="Source language"
          placeholder="Select source language"
          name="sourceLanguage"
          value={sourceLanguage}
          items={sourceLanguages}
          hasError={sourceLanguageError ? true : false}
          errorMessage={sourceLanguageError ? sourceLanguageError : ""}
          onChange={this.handleChange}
        ></Dropdown>
        <Dropdown
          className="language__dropdown"
          label="Target language"
          placeholder="Select target language"
          name="targetLanguage"
          value={targetLanguage}
          items={targetLanguages}
          hasError={targetLanguageError ? true : false}
          errorMessage={targetLanguageError ? targetLanguageError : ""}
          onChange={this.handleChange}
        ></Dropdown>

        <div className="language__view">
          <h5 className="language__view-text">
            Source Language:&nbsp;
            <span className="language-text">
              {sourceLanguage
                ? this.getLanguageName(sourceLanguage, "sourceLanguage")
                : "not selected"}
            </span>
          </h5>
          <h5 className="language__view-text">
            Target Language:&nbsp;
            <span className="language-text">
              {targetLanguage
                ? this.getLanguageName(targetLanguage, "targetLanguage")
                : "not selected"}
            </span>
          </h5>
        </div>
      </div>
    );
  }
}

export default LanguageSelector;
