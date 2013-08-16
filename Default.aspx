<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="GMapLab2.Default" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Slavekov Google Map Lab</title>
    <link href="~/styles/default.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="http://<%=(Request.Url.Host + ":" + Request.Url.Port + (Request.Url.Segments.Length == 2 ? String.Empty : "/" + Request.Url.Segments[1].TrimEnd('/'))) %>/scripts/gmap2.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js" type="text/javascript"></script>
</head>
<body>
<form id="form1" runat="server">
<div>
    <%--<asp:HiddenField ID="hdnPageSize" runat="server" ClientIDMode="Static" />--%>
    <span id="lblPageSize" runat="server" clientidmode="Static" class="fake_hidden"></span>
</div>
<h1>Slavekov Google Map Lab</h1>
<div class="err_msg">
    <asp:Label ID="lblErrMsg" runat="server" ClientIDMode="Static" ViewStateMode="Disabled" />
</div>
<!-- Budući da je 'tableless' dizajnom, u kojega se kunu mnogi samozvani gurui web-dizajna, aposlutno nemoguće postići neke ELEMENTARNE stvari, npr.
     da je neki 'div' u višestupčanom prostoru razvučen na ostatak (tj. sve ono što ne zauzimaju prethodni divovi, pučki rečeno width:100%), 
     svi takvi genijalci mogu svoje mudrolije okačiti mačku o rep. 
     BTW, Gmail, Google Maps i Oracle Apex koriste tableless dizajn - osim kada ubace i tabelu. :-) -->
<table class="content">
    <tr>
        <td class="left_menu">
            <div id="LijeviIzbornik" class="repeater">
                <div class="rpt_header">
                    Brojačka mjesta
                </div>

                <asp:Repeater ID="rptBrojackaMjesta" runat="server" onload="rptBrojackaMjesta_Load">
                    <ItemTemplate>

                <div class="rpt_item">
                    <asp:HiddenField ID="hdnGSirina" runat="server" Value='<%#Eval("GSirina") %>' />
                    <asp:HiddenField ID="hdnGDuzina" runat="server" Value='<%#Eval("GDuzina") %>' />
                    <a id="lnkNaziv" runat="server" href="#"><%#Eval("Naziv") %></a>
                </div>

                    </ItemTemplate>
                    <AlternatingItemTemplate>

                <div class="rpt_item rpt_alt_item">
                    <asp:HiddenField ID="hdnGSirina" runat="server" Value='<%#Eval("GSirina") %>' />
                    <asp:HiddenField ID="hdnGDuzina" runat="server" Value='<%#Eval("GDuzina") %>' />
                    <a id="lnkNaziv" runat="server" href="#"><%#Eval("Naziv") %></a>
                </div>

                    </AlternatingItemTemplate>
                </asp:Repeater>

                <table class="rpt_footer">
                    <tr>
                        <td>
                            <a href="#" onclick="stranici('first')"><img src="images/nav_first.png" class="nav_icons" alt="Prva" /></a>
                            <a href="#" onclick="stranici('prev')"><img src="images/nav_prev.png" class="nav_icons" alt="Prethodna" /></a>
                        </td>
                        <td class="fullwidth centered">&nbsp;</td>
                        <td>
                            <a href="#" onclick="stranici('next')"><img src="images/nav_next.png" class="nav_icons" alt="Iduća" /></a>
                            <a href="#" onclick="stranici('last')"><img src="images/nav_last.png" class="nav_icons" alt="Zadnja" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" class="right_aligned">
                            Strana&nbsp;
                            <asp:Label ID="lblCurrPage" runat="server" ClientIDMode="Static" />
                            &nbsp;od&nbsp;
                            <asp:Label ID="lblPageCount" runat="server" ClientIDMode="Static" />
                        </td>
                    </tr>
                </table>
            </div>        
        </td>
        <td class="center_content">
            <div id="GoogleMapa" runat="server" clientidmode="Static" class="gmap"></div>
        </td>
    </tr>
</table>
<div>
    <h3>Upute za kretanje po izborniku brojačkih mjesta tipkovnicom</h3>
    <ul>
        <li>Listanje prema kraju: <strong>A</strong> ili <strong>lijeva strelica</strong>*</li>
        <li>Listanje prema početku: <strong>D</strong> ili <strong>desna strelica</strong>*</li>
        <li>Pomicanje unutar jedne stranice prema gore: <strong>W</strong>, <strong>gornja strelica</strong>* ili <strong>Tab</strong></li>
        <li>Pomicanje unutar jedne stranice prema dolje: <strong>S</strong>, <strong>donja strelica</strong>* ili <strong>Shift + Tab</strong></li>
        <li>Prebacivanje na početak: <strong>Q</strong></li>
        <li>Prebacivanje na kraj: <strong>E</strong></li>
    </ul>
    <small><strong>*</strong> Pomicanje strelicama na Internet Exploreru pomiče i cijelu stranicu za one smjerove za koje se prikazuju klizači (<i>scrollbars</i>).</small>
</div>

</form>
</body>
</html>
