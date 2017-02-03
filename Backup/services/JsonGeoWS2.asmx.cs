using System.ComponentModel;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using GMapLab2.BizLogic;

namespace GMapLab2
{
	/// <summary>
	/// Jednostavni geografski web-servis koji vraća podatke u JSON formatu.
	/// </summary>
	[WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    [ScriptService]
	public class JsonGeoWS2 : WebService
	{
		[WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
		public string DohvatiGeoPodatke(int param)
		{
            return new JavaScriptSerializer().Serialize(Utils.PrevediZaJSON(BrojackoMjestoBO.DohvatiGeoPodatke()));
        }
	}
}

