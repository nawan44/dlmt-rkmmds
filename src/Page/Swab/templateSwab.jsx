import React from "react";
import FormRekamSwab from "./formRekamSwab";

export default function TemplateSWab(props) {
  const { dataHistorySwab, itemHistorySwab, aksiHistorySwab } = props;

  return (
    <div className="head-template">
      <FormRekamSwab
        dataHistorySwab={dataHistorySwab}
        itemHistorySwab={itemHistorySwab}
        aksiHistorySwab={aksiHistorySwab}
      />
    </div>
  );
}
