import React from "react";
import "styles/LanguageSelector.scss";
import Dropdown from "components/Dropdown/Dropdown";

interface Language {
  value: string;
  text: string;
}

interface Props {
  sourceLanguage: Language;
  targetLanguage: Language;
  onChange: (language: Language, type: string) => void;
}

interface State {
  sourceLanguage: Language;
  targetLanguage: Language;
  sourceLanguages: Language[];
  targetLanguages: Language[];
}

class LanguageSelector extends React.Component<Props, State> {
  state: State = {
    sourceLanguage: this.props.sourceLanguage,
    targetLanguage: this.props.targetLanguage,
    sourceLanguages: [{ value: "EN", text: "English" }],
    targetLanguages: [
      { value: "IT", text: "Italian" },
      { value: "GE", text: "German" },
      { value: "SP", text: "Spanish" },
      { value: "FR", text: "French" },
    ],
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps !== this.props) {
      this.setState({
        sourceLanguage: this.props.sourceLanguage,
        targetLanguage: this.props.targetLanguage,
      });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const text = this.getLanguageName(e.target.value, target.name);
    const language = {
      value: e.target.value,
      text,
    };

    this.props.onChange(language, target.name);
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
    } = this.state;

    return (
      <div className="language">
        <Dropdown
          className="language__dropdown"
          label="Source language"
          placeholder="Select source language"
          name="sourceLanguage"
          value={sourceLanguage.value}
          items={sourceLanguages}
          onChange={this.handleChange}
        ></Dropdown>
        <Dropdown
          className="language__dropdown"
          label="Target language"
          placeholder="Select target language"
          name="targetLanguage"
          value={targetLanguage.value}
          items={targetLanguages}
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
