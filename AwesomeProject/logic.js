export const generateSchedule= (attendees) =>{
    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    const numRows = 8; // Anzahl der Parkplatzzeilen
    const numCols = daysOfWeek.length;
  
    // Erstellen eines leeren 2D-Arrays für die Tabelle
    const tableData = new Array(numRows).fill(null).map(() => new Array(numCols).fill(null));
  
    // Zufällige Zuweisung der Anwärter auf die Parkplätze pro Tag
    for (let i = 0; i < numCols; i++) {
      const remainingAttendees = [...attendees];
      const assignedAttendees = new Set();
      for (let j = 0; j < numRows; j++) {
        // Anwärter zufällig auswählen, der noch nicht ausgewählt wurde und den Tag nicht überschritten hat
        const availableAttendees = remainingAttendees.filter(name => !assignedAttendees.has(name));
        const availableSlots = numRows - j; // Anzahl der noch freien Slots
        if (availableAttendees.length > availableSlots) {
          // Wenn es mehr Anwärter als freie Slots gibt, zufällig eine auswählen
          const randomIndex = Math.floor(Math.random() * availableAttendees.length);
          const randomAttendee = availableAttendees[randomIndex];
          tableData[j][i] = randomAttendee;
          assignedAttendees.add(randomAttendee);
          remainingAttendees.splice(remainingAttendees.indexOf(randomAttendee), 1);
        } else if (availableAttendees.length > 0) {
          // Wenn es nicht mehr freie Slots als Anwärter gibt, die verbleibenden zufällig verteilen
          availableAttendees.forEach(name => {
            const randomIndex = Math.floor(Math.random() * availableSlots);
            tableData[j + randomIndex][i] = name;
            assignedAttendees.add(name);
            remainingAttendees.splice(remainingAttendees.indexOf(name), 1);
          });
          break;
        } else {
          // Wenn es keine verfügbaren Anwärter mehr gibt, den Slot als frei markieren
          tableData[j][i] = '*FREI*';
        }
      }
    }
  
    // Rückgabe der Tabelle als 2D-Array
    return tableData;
  };
   