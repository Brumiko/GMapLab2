namespace GMapLab2.BizLogic
{
    /// <summary>
    /// Ova klasa je POTPUNO NEPOTREBNA i služi samo za rješavanje problema decimalnog separatora
    /// pri JSON serijalizaciji.
    /// </summary>
    public class BrojackoMjestoJSON
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string GSirina { get; set; } // string... >:-<
        public string GDuzina { get; set; } // string... >:-<
        public string Info { get; set; }

        public BrojackoMjestoJSON() { }

        public BrojackoMjestoJSON(int id, string naziv, string gSirina, string gDuzina, string detalji)
        {
            Id = id;
            Naziv = naziv;
            GSirina = gSirina;
            GDuzina = gDuzina;
            Info = detalji;
        }
    }
}