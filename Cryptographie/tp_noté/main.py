'''
-------------------------------
# CONSIGNES
-------------------------------

/!\ Ne pas modifier /!\ 
/!\ Vous n'avez pas nécessairement besoin de comprendre ce script /!\ 

'''

from script import *
import random
import string

def generer_string(taille):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(taille))
    return result_str

def estPremier(x):
    flag = False
    while not flag:
        for i in range(2, x):
            if (x % i) == 0:
                flag = True
                break
        return not flag

def chiffrer_message(message, e, n):
    c = [] 
    for i in range(len(message)):
        try:
            c.append(chiffrer_lettre_rsa(message[i], e, n))
        except:
            c.append(0)
    return "-".join([str(num) for num in c])

def dechiffrer_message(message, d, n):
    m = []
    mots = message.split("-")
    for lettre in mots:
        try:
            m.append(dechiffrer_lettre_rsa(lettre, d, n))
        except:
            m.append("")
    return "".join(m)


def diffieHellman():
    p = generer_nombre_premier(20, 100)
    # a, b et g doivent être plus petit que p
    mini = 1
    maxi = 10
    g = nombre_aleatoire(mini, maxi)
    a = nombre_aleatoire(mini, maxi)
    b = nombre_aleatoire(mini, maxi)

    B = calculer_clef_secrete(g, b, p)
    A = calculer_clef_secrete(g, a, p)

    K1 = calculer_clef_commune(A, b, p)
    K2 = calculer_clef_commune(B, a, p)

    if K1 == K2:
        print("Note Diffie-Hellman : 20 / 20")


if __name__ == '__main__':
    d = {}
    note_totale = 0

    id = identifiants()
    d["prenom"] = id[0]
    d["nom"] = id[1]

    ################# evalutation de RSA #################

    note_pgcd = 0
    if pgcd(221, 782) == 17:
        note_pgcd += 3

    note_totale += note_pgcd
    print("Note sur PGCD: ", note_pgcd, "/ 3")

    cles = None
    try:
        cles = generer_clefs_rsa()
    except:
        cles = {
            "p": -1,
            "q": -1,
            "phi": -1,
            "public": -1,
            "private": -1,
            "modulus": -1
        }
    
    note_phi = 0
    if pgcd(cles["public"], cles["phi"]) == 1:
        note_phi += 3

    note_totale += note_phi
    print("Note sur génération de Phi: ", note_phi, "/ 3")

    note_premier = 0
    if cles["p"] != -1  and cles["q"] != -1 and estPremier(cles["p"]) and estPremier(cles["q"]):
        note_premier += 2

    note_totale += note_premier
    print("Note génération de premiers: ", note_premier, "/ 2")

    note_rsa = 0
    for i in range(1, 1201):
        msgClair1 = generer_string(i)
        msgChiffre = ""
        msgClair2 = ""
        try:
            msgChiffre = chiffrer_message(msgClair1, cles["public"], cles["modulus"])
        except:
            msgChiffre = None
        try:
            msgClair2 = dechiffrer_message(msgChiffre, cles["private"], cles["modulus"])
        except:
            msgClair2 = None

        if msgChiffre != None and msgClair2 != None and msgClair1 == msgClair2:
            note_rsa += 0.01

    note_totale += round(note_rsa, 2)
    print("Note sur RSA: ", round(note_rsa, 2), "/ 20")
    diffieHellman()
    print("\n---NOTE RSA (SIMULATION)---")
    print(d["prenom"], d["nom"], " -> ", round(note_totale, 2), "/ 20")

    print("\n(Cette simulation est une version simplifiée du script de correction final et ne garantit pas la note indiquée)")