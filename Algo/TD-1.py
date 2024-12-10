from random import *
import time

max = 10000

before = time.time()
t = []


#Avec while => 3 boucles

#Solution n°1 : environ 5 secondes
# for i in range(0,max):
#   x = randrange(1,max+1)
#   while x in t:
#        x = randrange(1,max+1)
#   t.append(x)

#Solution n°2 : environ 5 secondes
# while len(t) != max:
#         x = randrange(1,max+1)
#         if not x in t:
#             t.append(x)

#Solution n°3 : on code le "in" : bcp trop long
# while len(t) != max:
#     x = randrange(1, max + 1)
#     i=0
#     found = False
#     while i<len(t) and not found:
#         found = t[i] == x
#         i += 1
#     if not found :
#         t.append(x)

#Solution n°4 : interdiction de boucls imbriqués => opti
available = []
for i in range(max):
    available.append(i)

for i in range(max):
    t.append(available.pop(randrange(0,len(available))))


after = time.time()
print(f"Temps d'exécution : {after - before:.2f} secondes")
print(f"Taille de la liste t : {len(t)}")
#print(t)