using System.Collections.Generic;
using System.Globalization;
using System.Web.UI;
using GMapLab2.BizLogic;

namespace GMapLab2
{
    public class Utils
    {

        /// <summary>
        /// Rekurzivno išče kontrolu unutar kontejnera.
        /// http://www.codenewsgroups.net/group/microsoft.public.dotnet.framework.aspnet.webcontrols/topic10654.aspx
        /// </summary>
        /// <param name="container">Kontejner (objekt).</param>
        /// <param name="myControl">ID tražene kontrole</param>
        /// <returns>Kontrolu ako postoji, inače null.</returns>
        public static Control FindControlRecursively(Control container, string myControl)
        {
            foreach (Control currCtl in container.Controls)
            {
                if (currCtl.ID == myControl)
                {
                    return currCtl;
                }
                else
                {
                    if (currCtl.HasControls())
                    {
                        Control tempCtl = FindControlRecursively(currCtl, myControl);
                        if (tempCtl != null)
                        {
                            return tempCtl;
                        }
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Ova metoda postoji uglavnom zbog decimalnog zareza/točke. >:-<
        /// </summary>
        /// <param name="brojackaMjesta">Popis brojačkih mjesta.</param>
        /// <returns>Polje brojačkih mjesta</returns>
        public static BrojackoMjestoJSON[] PrevediZaJSON(List<BrojackoMjesto> brojackaMjesta)
        {
            BrojackoMjestoJSON[] brojackaMjestaJSON = new BrojackoMjestoJSON[brojackaMjesta.Count];
            for (int i = 0; i < brojackaMjesta.Count; i++)
            {
                brojackaMjestaJSON[i] = new BrojackoMjestoJSON(
                    brojackaMjesta[i].Id,
                    brojackaMjesta[i].Naziv,
                    brojackaMjesta[i].GSirina.ToString(CultureInfo.InvariantCulture),
                    brojackaMjesta[i].GDuzina.ToString(CultureInfo.InvariantCulture),
                    brojackaMjesta[i].Info
                );
            }
            return brojackaMjestaJSON;
        }
    }
}