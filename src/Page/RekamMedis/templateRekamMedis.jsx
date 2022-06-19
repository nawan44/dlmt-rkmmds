import React from "react";
import FormRekamMedis from "./formRekamMedis";

export default function TemplateRekamMedis(props) {
  const { dataHistory, itemHistory, aksiHistory } = props;
  return (
    <div className="head-template">
      <FormRekamMedis
        dataHistory={dataHistory}
        itemHistory={itemHistory}
        aksiHistory={aksiHistory}
      />
    </div>
  );
}
