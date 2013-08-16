using System;
using System.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using GMapLab2.BizLogic;
using System.Web.UI.HtmlControls;

namespace GMapLab2
{
	public partial class Default : Page
	{
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    rptBrojackaMjesta.DataSource = Utils.PrevediZaJSON(BrojackoMjestoBO.DohvatiGeoPodatke());
                    rptBrojackaMjesta.DataBind();

                    int recordCount = rptBrojackaMjesta.Items.Count;
                    int pageSize = Convert.ToInt32(ConfigurationManager.AppSettings["pageSize"]);
                    int pageCount = (recordCount + pageSize - 1) / pageSize;

                    lblCurrPage.Text = "1";
                    lblPageCount.Text = pageCount.ToString();
                    // Budući da najingeniozniji od svih M$-ovih poluprodukata jedini u browserskoj konkurenciji ne zna čitati skrivena polja kak Bog zapoveda,
                    // moramo prilagoditi logiku toj uvrnutosti koja još uvijek zauzima skoro pola tržišta, navodno, te koristiti labelu/span uz style="display:none;" 
                    // za prikaz skrivenih vrijednosti.
                    //hdnPageSize.Value = pageSize.ToString();
                    lblPageSize.InnerText = pageSize.ToString();

                    // Podešavanje visine mape... ne funkcionira:
                    // http://forums.asp.net/t/1220172.aspx
                }
                catch (Exception ex)
                {
                    lblErrMsg.Text = ex.Message;
                }
            }
        }

        protected void rptBrojackaMjesta_Load(object sender, EventArgs e)
        {
            foreach (var item in rptBrojackaMjesta.Items)
            {
                HtmlAnchor link = (HtmlAnchor)Utils.FindControlRecursively((Control)item, "lnkNaziv");
                // Zakucaj lat i lng na onclick događaj pridružen linku.
                link.Attributes.Add(
                    "onclick", 
                    "pozicioniraj(" + 
                        ((HiddenField)Utils.FindControlRecursively((Control)item, "hdnGSirina")).Value.Replace(',', '.') +  ", " + 
                        ((HiddenField)Utils.FindControlRecursively((Control)item, "hdnGDuzina")).Value.Replace(',', '.') +  ", " +
                        link.ClientID + 
                    ")"
                );
            }
        }
	}
}

