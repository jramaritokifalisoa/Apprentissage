                                      Mon Projet : API Reservation de voyages          
Une API REST développée avec Node.js et PostgreSQL, intégrant Swagger pour les tests et la documentation, permettant la gestion des réservations de voyage en temps réel avec un système d’authentification sécurisé via JWT.                                  


Sommaires:                                                                                                                     
 _Fonctionnalités

 _Technologies                                                                                                        
 _Architecture                                                                                                  
 _Installation                                                                                                                  
 _DocumentationAPI                                                                                                          
 _Auteurs                                                                                                                    

                                         _______________         ___________________

_Fonctionnalités :

    I) _ Authentification sécurisée : Inscription, connexion et profil avec gestion des rôles (User/Admin) via JWT.                      
    II) _ Gestion des accès : Middlewares de protection des routes selon les permissions.                                      
    III) _ Réservations : CRUD complet pour les utilisateurs et les administrateurs.                                            
    IV) _ Base de données relationnelle : Structure SQL optimisée avec contraintes                                                    

_Technologies   :

    I) _ Back-end : Node.js, Express.js                                                                                            
    II) _ Base de données : PostgreSQL (pg-pool)                                                                                
    III) _ Sécurité : Bcrypt (hachage), JSON Web Token (auth)                                                                 
    IV) _ Documentation : Swagger / OpenAPI 3.0                                                                                 
    V) _ Environnement : Dotenv                                                                                                 

_Architecture    :                                                                                                  
Pour une meilleure séparation des responsabilités mon projet suit le pattern MVC (Model-View-Controller)                        

    I) _ controllers/ :Retourne les réponses.                                                                          
    II) _ services/ : Logique métier (vérifications).                                                                            
    III) _ repository/ : Requêtes directes à la base de données SQL.                                                            
    IV) _ middlewares/ : Sécurité et validation des données.                                                                          
    V) _ migration/ : Contient les scripts de la structure de la base de données                                        
    VI) _ swagger/ : Regrouper la documentation de l’API et les outils permettant de tester les endpoints                              
    VII) _ routes/ : gère les routes de l’API                                                                                    

_Installation  :                                                                                                                 

I) _ Prérequis    :                                                                                                            
    
    Node.js (v18+)                                                                                            
    PostgreSQL installé et lancé                                                                                            
    Editeur de code installé et lancé                                                                                            

II) _ Clonage et dépendances :                                                                                                                                                                               
    
    git clone https://github.com/jramaritokifalisoa/Apprentissage.git                                                                                
    cd Apprentissage                                                                                                                                                                                                             
    npm install                                                                                                                                                                                                                    

III) _ Configuration (.env) :                                                                                                  
Crée un fichier .env à la racine et remplis-le comme suit :                                                                    

                  user = postgres
                  host = localhost
                  database= mianatra
                  password= votre_password
                  port= 5432
                  SECRET_KEY=mon_super_secret_tres_long

_Documentation API    :                                                                                                      
 lancé ce commande dans votre terminal :                                                                                       
 node migration/runMigrations                                                                                             
 puis                                                                                                                          
 lancé le serveur : nodemon app.js                                                                                              
 
 Une fois le serveur lancé, la documentation interactive est disponible ici :                                  
  http://localhost:5020/api-docs                                                                                                    

_Auteurs   :                                                                                                                
RAMARITOKIFALISOA Jocyl Nardo - Développeur Fullstack - www.linkedin.com/in/jocyl-nardo-ramaritokifalisoa-563b982b2
s



side
filtrer destination(recherche)
role->user voyage->reservation
