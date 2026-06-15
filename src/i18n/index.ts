import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import da from "./messages/da.json";
import de from "./messages/de.json";
import enGB from "./messages/en-GB.json";
import enIN from "./messages/en-IN.json";
import enSG from "./messages/en-SG.json";
import enUS from "./messages/en-US.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import hi from "./messages/hi.json";
import it from "./messages/it.json";
import ja from "./messages/ja.json";
import ko from "./messages/ko.json";
import nb from "./messages/nb.json";
import nl from "./messages/nl.json";
import pl from "./messages/pl.json";
import pt from "./messages/pt.json";
import ptBR from "./messages/pt-BR.json";
import ru from "./messages/ru.json";
import sv from "./messages/sv.json";
import th from "./messages/th.json";
import uk from "./messages/uk.json";
import zh from "./messages/zh.json";
import zhTW from "./messages/zh-TW.json";
import { DEFAULT_ONEURA_LOCALE } from "./localeConfig";

void i18n.use(initReactI18next).init({
  resources: {
    "en-GB": { translation: enGB },
    "en-US": { translation: enUS },
    "en-SG": { translation: enSG },
    "en-IN": { translation: enIN },
    fr: { translation: fr },
    es: { translation: es },
    pt: { translation: pt },
    "pt-BR": { translation: ptBR },
    de: { translation: de },
    it: { translation: it },
    nl: { translation: nl },
    da: { translation: da },
    sv: { translation: sv },
    nb: { translation: nb },
    pl: { translation: pl },
    uk: { translation: uk },
    ru: { translation: ru },
    ja: { translation: ja },
    zh: { translation: zh },
    "zh-TW": { translation: zhTW },
    ko: { translation: ko },
    th: { translation: th },
    hi: { translation: hi },
  },
  lng: DEFAULT_ONEURA_LOCALE,
  fallbackLng: DEFAULT_ONEURA_LOCALE,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
