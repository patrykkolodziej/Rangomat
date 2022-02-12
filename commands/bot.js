exports.run = async (bot, message, args) => 
{
  if(message.channel.name === "rangi")
  {
    if(message.author.id === "248165905119313948")
    {
      message.channel.lastMessage.delete();
      var returnMessage = "";
      returnMessage += "Jeżeli chcesz otrzymać rangę wpisz !ranga, pamiętaj o ustawieniu pseudonimu na discordzie identycznego jak nick w grze! Wielkość liter ma znaczenie.\n"
      returnMessage += "Rangi dostępne są od **75** zagranych gier na trybie **squad tpp**.\n"
      returnMessage += "Aktualnie przy nadawaniu rangi bierzemy pod uwagę: **\n\n1.KDA\n2.Średni damage\n3.Win ratio\n\n\n**"
      returnMessage += "Rangi ustalamy wedle następującej punktacji: \n\n**Odpaleniec** -> 900-999pkt.\n**Challenger** -> 800-899pkt.\n";
      returnMessage += "**Grandmaster** -> 700-799pkt.\n**Master** -> 600-699pkt.\n**Diamond** -> 500-599pkt.\n"
      returnMessage += "**Platinum** -> 400-499pkt.\n**Gold** -> 300-399pkt.\n**Silver** -> 200-299pkt.\n"
      returnMessage += "**Bronze** -> 100-199pkt.\n**Iron** -> 0-99pkt.\n"
      returnMessage += "**Morderca botów** -> Dla graczy bijących statystki w trybie swobodnym na boty.\n"
      returnMessage += "**Swieżak ** -> Nowi oraz nieaktywni gracze.\n\n\n"
      returnMessage += "**Dostępne komendy tylko na kanale #rangi **\n!ranga -> Nadaje rangę, dopisuje gracza do naszej bazy danych oraz aktualzuje statystki tejże bazy o ile gracz już się znajduje.\n!staty -> Wypisuje nasze statystki oraz po wprowadzeniu nicku np. !staty wiotq wypisze statystki gracza wiotq. Działa tylko dla graczy, których posiadamy w bazie, czyli wpisali już raz !ranga!\n!top 10 -> Aktualne top 10 sezonu wedle naszej punktacji, liczbe 10 można zamienic na dowolną.\n!adr 10 -> Aktualne top 10 sezonu wedle średniego dmg, liczbe 10 można zamienic na dowolną.\n!kda 10 -> Aktualne top 10 sezonu wedle kda, liczbe 10 można zamienic na dowolną.\n!longest -> Najdłuższy kill sezonu.\n!driver -> Największa ilość przejechanym kilometrów w sezonie.\n!swim - > Największa ilość przepłyniętych kilometrów w sezonie.\n!rambo -> Największa ilość zabójstw w pojedynczym meczu."
      message.channel.send(returnMessage);
    }
  }
}
exports.help = {
    name:"bot",
    channel:"rangi"
}