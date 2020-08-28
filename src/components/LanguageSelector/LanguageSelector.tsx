import React from "react";
import "styles/LanguageSelector.scss";
import Dropdown from "components/Dropdown/Dropdown";

interface Language {
  value: string;
  text: string;
}

interface State {
  sourceLanguage: Language;
  targetLanguage: Language;
  languages: Language[];
}

class LanguageSelector extends React.Component<{}, State> {
  state: State = {
    sourceLanguage: { value: "", text: "" },
    targetLanguage: { value: "", text: "" },
    languages: [
      { value: "EN", text: "English" },
      { value: "IT", text: "Italian" },
      { value: "GE", text: "German" },
      { value: "SP", text: "Spanish" },
      { value: "FR", text: "French" },
    ],
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const text = this.getLanguageName(e.target.value);
    const language = {
      value: e.target.value,
      text,
    };

    if (target.name === "sourceLanguage") {
      this.setState({ sourceLanguage: language });
    } else if (target.name === "targetLanguage") {
      this.setState({ targetLanguage: language });
    }
  };

  getLanguageName = (code: string) => {
    const { languages } = this.state;

    for (let language of languages) {
      if (language.value === code) {
        return language.text;
      }
    }

    return "";
  };

  render() {
    const { sourceLanguage, targetLanguage, languages } = this.state;

    return (
      <div className="language">
        <Dropdown
          className="language__dropdown"
          label="Source language"
          placeholder="Select source language"
          name="sourceLanguage"
          value={sourceLanguage.value}
          items={languages}
          onChange={this.handleChange}
        ></Dropdown>
        <Dropdown
          className="language__dropdown"
          label="Target language"
          placeholder="Select target language"
          name="targetLanguage"
          value={targetLanguage.value}
          items={languages}
          onChange={this.handleChange}
        ></Dropdown>

        <div className="language__view">
          <h5 className="language__view-text">
            Source Language:&nbsp;
            <span className="language-text">
              {sourceLanguage.value ? sourceLanguage.text : "not selected"}
            </span>
          </h5>
          <h5 className="language__view-text">
            Target Language:&nbsp;
            <span className="language-text">
              {targetLanguage.value ? targetLanguage.text : "not selected"}
            </span>
          </h5>
        </div>
      </div>
    );
  }
}

export default LanguageSelector;
