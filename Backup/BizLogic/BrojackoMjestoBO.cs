using System;
using System.Collections.Generic;
using System.Linq;

namespace GMapLab2.BizLogic
{
    public class BrojackoMjestoBO
    {
        /// <summary>
        /// Dohvaća SVA brojačka mjesta.
        /// </summary>
        /// <returns>Popis svih brojačkih mjesta.</returns>
        public static List<BrojackoMjesto> DohvatiGeoPodatke()
        {
            List<BrojackoMjesto> entities = null;
            using (TestGeoDBDataContext dc = DBHelper.GetTestGeoDBDataContext(false))
            {
                entities = (
                    from r in dc.BrojackoMjestos
                    orderby r.Naziv
                    select r
                ).ToList<BrojackoMjesto>();
            }
            return entities;
        }
    }
}
