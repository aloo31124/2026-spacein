const db = require('../firestore');

exports.fixUserIdField = async () => {
        try {
            const snapshot = await db.collection('User').get();

            if (snapshot.empty) {
                console.log('No user data found.');
                return;
            }

            const batch = db.batch(); // 使用批次寫入來提高效率

            snapshot.docs.forEach(doc => {
                const userData = doc.data();

                // 若 `id` 欄位存在，則改為 `id_old`
                if (userData.id) {
                    const updatedData = {
                        id_old: userData.id, // 原 id 變為 id_old
                        id: doc.id // Firestore 的 document ID 作為新的 id
                    };

                    // 準備更新 Firestore
                    const userRef = db.collection('User').doc(doc.id);
                    batch.update(userRef, updatedData);
                }
            });

            // 提交 Firestore 批次更新
            await batch.commit();
            console.log('User data updated successfully.');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
}

/**
 * endDatae 改存入 endDate
 */
exports.fixBookingErrorFieldendDate = async () => {
    try {
        const snapshot = await db.collection('Booking').get();

        if(snapshot.empty) {
            console.log("無預約資料");
        }
        const batch = db.batch(); // 使用批次寫入來提高效率

        let updateBookingList = [];
        snapshot.docs.forEach(doc => {
            const bookingDate = doc.data();
            if(bookingDate.endDatae) {
                const updatedData = {
                    endDate: bookingDate.endDatae,
                }
                // 更新
                const bookingRef = db.collection('Booking').doc(doc.id);
                batch.update(bookingRef, updatedData);
                updateBookingList.push(updatedData);
            }
        });

        await batch.commit();
        return updateBookingList;
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}


/**
如下, firestore 修正,
取出 mail 判斷, 並修改 userId
mail 為 aloo31124@gmail.com, userId 改 F0gY5gNP4nW4EkHpfq2k
mail 為 newaloo31124@gmail.com, userId 改 w6txjlikotDnGs3powQG
mail 為 garywallace.31177@gmail.com, userId 改 8sXR2L35KzOs4K5xJ1Z2
 */
exports.fixBookingErrorFieldUserId = async () => {
    const snapshot = await db.collection('Booking').get();

    if (snapshot.empty) {
        console.log("無預約資料");
        return { message: "無預約資料" };
    }

    const batch = db.batch(); // 使用批次寫入來提高效率

    snapshot.forEach(doc => {
        const data = doc.data();
        if (data.mail) {
            let newUserId = null;
            if (data.mail === 'aloo31124@gmail.com') {
                newUserId = 'F0gY5gNP4nW4EkHpfq2k';
            } else if (data.mail === 'newaloo31124@gmail.com') {
                newUserId = 'x0fYwJOWII3NupzsZ9G4';
            } else if (data.mail === 'garywallace.31177@gmail.com') {
                newUserId = '8sXR2L35KzOs4K5xJ1Z2';
            } else if (data.mail === 'reica2501@gmail.com') {
                newUserId = '9tDfBOyu4giyUddvILLe';
            } else if (data.mail === 'santasouth2013@gmail.com') {
                newUserId = 'G55H6zG4TIPMMkrzeB0a';
            } else if (data.mail === 'NVLFU5YNHDPIEYXPIRMCXVBZFQ-00@cloudtestlabaccounts.com') {
                newUserId = 'NfHCDE8N3H9njlnCvXHt';
            } else if (data.mail === 'kaycollier.07775@gmail.com') {
                newUserId = 'ORk3rPQj3WE5JVYXj1FU';
            } else if (data.mail === 'nathannorth2005@gmail.com') {
                newUserId = 'RYC0W2ing0tS69WvtLDc';
            } else if (data.mail === 'uniquesky@gmail.com') {
                newUserId = 'UXFVeA6W2gE6haNZBi45';
            } else if (data.mail === 'stoody0001@gmail.com') {
                newUserId = 'ZZdhqhffbBym0tNOQxHD';
            } else if (data.mail === 'miss5203@gmail.com') {
                newUserId = 'cmJHpPvl7kOWw6mSO3VO';
            } else if (data.mail === 'kagami3331@gmail.com') {
                newUserId = 'lkLkNiVD63FJgAlsvk5r';
            } else if (data.mail === 'contact.afg.updates@gmail.com') {
                newUserId = 'nLr0CSCtJXxJxDdlU1Z5';
            } else if (data.mail === 'carminachin.60457@gmail.com') {
                newUserId = 'pRGaBFVAxL3eGN7xrM8I';
            } else if (data.mail === 'office365.user.9005@gmail.com') {
                newUserId = 'uhTra01Xcov9Cyyo262y';
            } else if (data.mail === 'everettedwards.66816@gmail.com') {
                newUserId = 'wiWpECQr2CQ11UYcx5lG';
            }


            if (newUserId) {
                const docRef = db.collection('Booking').doc(doc.id);
                batch.update(docRef, { userId: newUserId });
            }
        }
    });

    await batch.commit();
    console.log("已完成 userId 更新");
    return { message: "已完成 userId 更新" };
};
