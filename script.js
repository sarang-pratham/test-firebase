const table = document.querySelector("table");
ids = [];
function displayData(data) {
	console.log(data);
	let totalScore = data.internal1 + data.internal2 + data.internal3;
	let str = `<tr><td>${data.name}</td><td>${totalScore}</td></tr>`;
	table.innerHTML += str;
}

const db = firebase.firestore();

let docRef = db.collection("students");

docRef.get().then((doc) => {
	doc.docs.forEach((d) => {
		ids.push(d.id);
	});
	ids.forEach((id) => {
		docRef = db.collection("students").doc(id);
		docRef
			.get()
			.then((doc) => {
				if (doc.exists) {
					displayData(doc.data());
				} else {
					console.log("No such document!");
				}
			})
			.catch((error) => {
				console.log("Error getting document:", error);
			});
	});
});
