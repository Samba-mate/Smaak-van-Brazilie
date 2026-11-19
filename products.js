// ============================================================
//  Smaak van Brazilië – producten en instellingen
//  Dit bestand bepaalt wat er op de website staat.
//  Bewerk het via beheer.html (aanbevolen) of direct hier.
//  beschikbaar: true  = bestelbaar
//  beschikbaar: false = tijdelijk niet (wordt grijs getoond)
//  prijs: tekst, bijv. "€ 2,50" of "op aanvraag"
// ============================================================
window.SITE = {
  naam: "Smaak van Brazilië",
  eigenaar: "Aina",
  plaats: "Groningen",
  telefoon: "06 00 00 00 00",            // TODO: echt nummer
  whatsapp: "31600000000",               // TODO: zonder + en zonder spaties, bijv. 31612345678
  email: "info@smaakvanbrazilie.nl",     // TODO: controleren
  instagram: "smaakvanbrazilie",
  afhaaladres: "Groningen (adres volgt bij bestelling)", // TODO
  verzending: "Verzending via PostNL is mogelijk voor een deel van het assortiment. Welke producten precies, en de kosten, bevestigt Aina bij je bestelling.", // TODO: precies maken met Aina
  bestelTermijn: "Bestel op tijd: hapjes en maaltijden een paar dagen van tevoren, taarten minimaal een week.", // TODO: termijnen bevestigen met Aina
  restaurantdagen: {
    groningen: "Elke maand een Braziliaanse restaurantdag in Groningen. Datum en locatie volgen via Instagram.", // TODO: vaste dag/locatie bevestigen met Aina
    leeuwarden: "Vanaf volgend jaar ook in Leeuwarden."
  },
  mededeling: ""  // korte tekst bovenaan de site, bijv. "Paasbestellingen open tot 28 maart". Leeg = verborgen.
};

window.CATEGORIEEN = [
  { id: "hapjes",   naam: "Braziliaanse hapjes", pt: "Salgados",  intro: "Knapperig, hartig en gemaakt om te delen. Vers gefrituurd of diepvries om thuis af te bakken." },
  { id: "gerechten",naam: "Maaltijden",          pt: "Pratos",    intro: "Het eten van thuis: langzaam gestoofd, rijk van smaak. Diepvries, zodat je het thuis op je eigen moment opwarmt." },
  { id: "taarten",  naam: "Taarten",             pt: "Bolos",     intro: "Elke taart is maatwerk. Kies een smaak, een kleur en een thema, Aina doet de rest." },
  { id: "doces",    naam: "Bonbons & zoet",      pt: "Doces",     intro: "Kleine Braziliaanse zoetigheden, perfect als cadeau, bij de koffie of op een feestje." },
  { id: "catering", naam: "Catering",            pt: "Para festas", intro: "Voor verjaardagen, bedrijfsborrels, bruiloften en alles daartussen." }
];

window.PRODUCTEN = [
  // ---- Hapjes (bron: webshop smaakvanbrazilie.nl, prijzen per 10 stuks) ----
  { id: "coxinha",      cat: "hapjes", naam: "Coxinha",                  pt: "Coxinha de frango",     omschrijving: "Braziliaanse snack in de vorm van een kippenpootje: deeg op basis van kippenbouillon, gevuld met kip, gepaneerd en knapperig gefrituurd.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "img/coxinha-closeup.jpg", beschikbaar: true, verzendbaar: true, populair: true },
  { id: "pao-de-queijo",cat: "hapjes", naam: "Pão de queijo",            pt: "Pão de queijo",         omschrijving: "Braziliaans kaasbroodje van tapiocameel, kaas en eieren. Luchtig, hartig en van nature glutenvrij.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "img/pao-de-queijo-hand.jpg", beschikbaar: true, verzendbaar: true, populair: true },
  { id: "pastel",       cat: "hapjes", naam: "Pastéis",                  pt: "Pastel de carne / queijo", omschrijving: "Gefrituurd deeg, flinterdun en vol blaasjes, gevuld met kaas of rundvlees.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "img/pastel-zak.jpg", beschikbaar: true, verzendbaar: false, populair: true },
  { id: "bolinha",      cat: "hapjes", naam: "Bolinha de queijo",        pt: "Bolinha de queijo",     omschrijving: "Kaasballetjes van kaas en tapiocameel, gefrituurd tot ze goudbruin zijn. Zacht van binnen, knapperig van buiten.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "img/pao-de-queijo-bowl.jpg", beschikbaar: true, verzendbaar: true },
  { id: "risoles-carne",cat: "hapjes", naam: "Risoles de carne",         pt: "Risole de carne",       omschrijving: "Gepaneerd frituurhapje met een vulling van gekruid rundergehakt.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "", beschikbaar: true, verzendbaar: true },
  { id: "risoles-ham",  cat: "hapjes", naam: "Risoles de presunto e queijo", pt: "Risole de presunto e queijo", omschrijving: "Gepaneerd frituurhapje gevuld met ham en kaas.", prijs: "€ 8,50", eenheid: "10 stuks", foto: "", beschikbaar: true, verzendbaar: true },
  { id: "empada",       cat: "hapjes", naam: "Empada de frango",         pt: "Empada de frango",      omschrijving: "Klein hartig taartje met een boterzachte korst, gevuld met kip, ui en kruiden.", prijs: "€ 12,00", eenheid: "5 stuks", foto: "img/vitrine.jpg", beschikbaar: true, verzendbaar: false },
  { id: "esfiha-carne", cat: "hapjes", naam: "Esfiha de carne",          pt: "Esfiha de carne",       omschrijving: "Gebakken driehoekje van deeg, gevuld met gekruid gehakt. Libanees-Braziliaanse klassieker.", prijs: "€ 9,50", eenheid: "10 stuks", foto: "", beschikbaar: true, verzendbaar: true },
  { id: "esfiha-veg",   cat: "hapjes", naam: "Esfiha vegetarisch",       pt: "Esfiha vegetariana",    omschrijving: "Gebakken driehoekje van deeg met een vulling van tomaat, ui, paprika, maïs en kaas. Vegetarisch.", prijs: "€ 9,50", eenheid: "10 stuks", foto: "", beschikbaar: true, verzendbaar: true },
  // ---- Maaltijden (bron: webshop, vanaf-prijs per portie; grotere porties tot € 60,00) ----
  { id: "feijoada",     cat: "gerechten", naam: "Feijoada",              pt: "Feijoada (congelada)",  omschrijving: "Stoofpot van zwarte bonen met verschillende soorten varkensvlees en worst, gekruid met knoflook en specerijen. Diepvries, thuis opwarmen.", prijs: "vanaf € 16,50", eenheid: "per portie, grotere porties mogelijk", foto: "img/feijoada-bord.jpg", beschikbaar: true, verzendbaar: false, populair: true },
  { id: "moqueca",      cat: "gerechten", naam: "Moqueca de peixe",      pt: "Moqueca de peixe",      omschrijving: "Visstoofpot van de Braziliaanse kust: vis in een saus van kokosmelk, tomaat, ui, knoflook en koriander. Licht pittig en romig.", prijs: "vanaf € 16,50", eenheid: "per portie", foto: "", beschikbaar: true, verzendbaar: false },
  { id: "bobo",         cat: "gerechten", naam: "Bobó de camarão",       pt: "Bobó de camarão",       omschrijving: "Garnalen in een romige saus van cassave, kokosmelk, tomaat en kruiden. Een klassieker uit Bahia.", prijs: "vanaf € 16,50", eenheid: "per portie", foto: "", beschikbaar: true, verzendbaar: false },
  { id: "carne-panela", cat: "gerechten", naam: "Carne de panela",       pt: "Carne de panela",       omschrijving: "Langzaam gestoofd rundvlees met ui, knoflook, tomaat en kruiden. Boterzacht Braziliaans comfortfood.", prijs: "vanaf € 16,50", eenheid: "per portie", foto: "", beschikbaar: true, verzendbaar: false },
  // ---- Taarten (webshop: "naar wens samengesteld voor de jarige") ----
  { id: "taart-feest",  cat: "taarten", naam: "Verjaardagstaart op maat", pt: "Bolo de aniversário",  omschrijving: "Naar wens samengesteld voor de jarige. Kies smaak, kleur en topper.", prijs: "op aanvraag", eenheid: "prijs naar formaat", foto: "img/taart-roze-tweelaags.jpg", beschikbaar: true, verzendbaar: false, populair: true },
  { id: "taart-brigadeiro", cat: "taarten", naam: "Brigadeirotaart",     pt: "Bolo de brigadeiro",    omschrijving: "Chocoladetaart met brigadeiro-vulling, ganache en een kroon van brigadeiros en beijinhos.", prijs: "op aanvraag", eenheid: "prijs naar formaat", foto: "img/taart-brigadeiro.jpg", beschikbaar: true, verzendbaar: false },
  { id: "taart-naked",  cat: "taarten", naam: "Naked cake met fruit",    pt: "Bolo naked",            omschrijving: "Luchtige lagen, lichte crème en vers rood fruit.", prijs: "op aanvraag", eenheid: "prijs naar formaat", foto: "img/taart-naked-fruit.jpg", beschikbaar: true, verzendbaar: false },
  { id: "taart-kinder", cat: "taarten", naam: "Kindertaart met thema",   pt: "Bolo infantil",         omschrijving: "Onderwaterwereld, beertjes of een ander thema. Vertel het, Aina maakt het.", prijs: "op aanvraag", eenheid: "prijs naar formaat", foto: "img/taart-onderwater.jpg", beschikbaar: true, verzendbaar: false },
  // ---- Zoet (uit de briefing: bonbons; nog niet in de webshop, prijzen invullen) ----
  { id: "brigadeiro",   cat: "doces", naam: "Brigadeiros",               pt: "Brigadeiro",            omschrijving: "Zachte chocoladetruffels van gecondenseerde melk, gerold in hagelslag.", prijs: "op aanvraag", eenheid: "per doosje", foto: "img/taart-brigadeiro.jpg", beschikbaar: true, verzendbaar: true },
  { id: "bonbons",      cat: "doces", naam: "Bonbons",                   pt: "Bombons",               omschrijving: "Handgemaakte bonbons met Braziliaanse vullingen.", prijs: "op aanvraag", eenheid: "per doosje", foto: "", beschikbaar: true, verzendbaar: true },
  { id: "paasei",       cat: "doces", naam: "Paasproducten",             pt: "Páscoa",                omschrijving: "Seizoensaanbod rond Pasen. Details volgen.", prijs: "op aanvraag", eenheid: "", foto: "", beschikbaar: false, verzendbaar: false, seizoen: "Pasen" },
  // ---- Catering ----
  { id: "hapjesplank",  cat: "catering", naam: "Hapjesmix voor feesten", pt: "Mesa de salgados",      omschrijving: "Een mix van coxinha, pão de queijo, bolinha, risoles, esfiha en empada voor je feest of borrel.", prijs: "op aanvraag", eenheid: "per aantal gasten", foto: "img/vitrine.jpg", beschikbaar: true, verzendbaar: false },
  { id: "maaltijd-groep", cat: "catering", naam: "Maaltijden voor groepen", pt: "Pratos para grupos",  omschrijving: "Feijoada, moqueca, bobó of carne de panela in grote porties, inclusief bijgerechten.", prijs: "op aanvraag", eenheid: "per aantal gasten", foto: "img/feijoada-guarana.jpg", beschikbaar: true, verzendbaar: false }
];
