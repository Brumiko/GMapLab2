using System.Configuration;

namespace GMapLab2.BizLogic
{
    public static class DBHelper
    {
        public static TestGeoDBDataContext GetTestGeoDBDataContext(bool objectTrackingEnabled)
        {
            TestGeoDBDataContext dc = new TestGeoDBDataContext(ConfigurationManager.ConnectionStrings["TestGeoDBConnectionString"].ConnectionString);
            dc.ObjectTrackingEnabled = objectTrackingEnabled;
            return dc;
        }
    }
}