<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produits;    
use App\Models\Plateforme; 
use App\Models\PlateformeProduit; 

class ProduitsSeeder extends Seeder
{
    
    public function run(): void
    {
        $produit = Produits::create([
            'nom' => 'The Legend of Zelda: Tears Of The Kingdom',
            'description' => 'Un jeu d\'aventure en monde ouvert dans l\'univers de Zelda.',
            'image' => 'zelda.webp', 
            'prix' => 34.00,
            'stock' => 15,
            'category_id' => 1, 
        ]);
        $produit->plateformes()->attach([7]);
       
        $produit = Produits::create([
            'nom' => 'Wukong',
            'description' => "Wukong est un jeu action-RPG inspiré de la mythologie chinoise. 
            Son histoire est une adaptation des récits de La Pérégrination vers l'Ouest, 
            l'un des Quatre livres extraordinaires de la littérature chinoise. 
        
            Vous y incarnerez le Prédestiné et prendrez part à une épopée merveilleuse au cours 
            de laquelle vous devrez affronter maints périls pour découvrir la sombre vérité 
            d'une légende glorieuse.
        
            Explorez une terre regorgeant de merveilles.",
            'image' => 'wukong.webp', 
            'prix' => 59.99,
            'stock' => 22,
            'category_id'  => 2, 
        ]);
        $produit->plateformes()->attach([       
        
        1 => ['prix' => 40.00], 
        2 => ['prix' => 59.99],  
        3 => ['prix' => 45.00],  
        4 => ['prix' => 55.00], 
        5 => ['prix' => 30.00],  
    ]);

        $produit = Produits::create([
            'nom' => 'Stalker2',
            'description' => 'S.T.A.L.K.E.R. 2: Heart of Chornobyl est la suite de la franchise de jeux primée développée par GSC Game World. Découvre un gameplay unique qui mélange jeu de tir à la première personne, simulation immersive et horreur .',
            'image' => 'stalker2.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 49.00,
            'stock' => 12,
            'category_id'  => 5, // Aventure
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 49.00], 
            2 => ['prix' => 65.00], 
        ]);  
       
        $produit = Produits::create([
            'nom' => 'Sonic X Shadow Generation',
            'description' => 'SONIC X SHADOW GENERATIONS ÉDITION DIGITAL DELUXE Achetez l\'édition Digital Deluxe de SONIC X SHADOW GENERATIONS et recevez des musiques iconiques .',
            'image' => 'sonic.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 25.45,
            'stock' => 15,
            'category_id'  => 1, // Aventure
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 25.45], 
            2 => ['prix' => 28.67],  
            3 => ['prix' => 45.00],  
            4 => ['prix' => 33.10], 
            5 => ['prix' => 20.00],  
        ]);
      
       
        $produit = Produits::create([
            'nom' => 'Shadow Of Mordor',
            'description' => 'L\'histoire se déroule entre les événements des récits Le Hobbit et Le Seigneur des anneaux écrits par J. R. R. Tolkien.',
            'image' => 'shadow-of-mordor.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 34.00,
            'stock' => 8,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([1]);  
        
        $produit = Produits::create([
            'nom' => 'Sea Of The Thieves',
            'description' => 'Dans Sea of Thieves, vivez la vie de pirate : navigation, exploration, combats et pillages, résolution d’énigmes et chasse au trésor rythmeront votre quotidien.',
            'image' => 'sea-of-the-thieves.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 24.00,
            'stock' => 8,
            'category_id'  => 1, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 24.00], 
            2 => ['prix' => 50.00],  
            6 => ['prix' => 30.00],  
        ]);
        
        $produit = Produits::create([
            'nom' => 'Red Dead Redemption II',
            'description' => ' L\'histoire se déroule en 1899, dans une représentation fictive des États-Unis, et suit les exploits d\'Arthur Morgan, un hors-la-loi 
            et membre du gang Van der Linde, qui doit faire face au déclin de l\'Ouest tout en tentant de survivre contre les forces gouvernementales, les gangs rivaux et autres adversaires. 
            Le jeu est présenté à travers des perspectives à la première et à la troisième personne, le joueur pouvant se déplacer librement dans son monde ouvert interactif. Les éléments de gameplay incluent les fusillades, les vols, la chasse, l\'équitation,
             l\'interaction avec des personnages non-joueurs et le maintien du niveau d\'honneur du personnage par des choix moraux et ses actes',
            'image' => 'redead.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 22.50,
            'stock' => 10,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 24.00], 
            2 => ['prix' => 50.00],  
            3 => ['prix' => 22.50],
            4 => ['prix' => 30.10],  
            5 => ['prix' => 36.85], 
            6 => ['prix' => 40.00],     
        ]);  
        
        $produit = Produits::create([
            'nom' => 'Rayman Legends',
            'description' => ' Jeu de plates-formes de la célèbre série française, Rayman Legends permet au joueur de partir à la recherche des Ptizêtres dans divers environnements.
             On retrouve le fameux Rayman, mais aussi d\'autres personnages jouables à débloquer ainsi qu\'un mode trois joueurs. Il est également possible d’interagir avec le décor.',
            'image' => 'rayman.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 11.50,
            'stock' => 4,
            'category_id'  => 1, 
        ]);
        $produit->plateformes()->attach([
            3 => ['prix' => 11.50],
            4 => ['prix' => 30.10],  
            5 => ['prix' => 36.85], 
            6 => ['prix' => 40.00], 
            7 => ['prix' => 26.50], 
        ]);  
        
        
        $produit = Produits::create([
            'nom' => 'Minecraft',
            'description' => 'Minecraft renferme des blocs, des créatures et une communauté florissante ! Pars à l’aventure en solo ou à plusieurs,
             il n’y a pas de mauvaise façon de jouer. Mais attention, ne creuse pas directement sous tes pieds.',
            'image' => 'minecraft.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 20.40,
            'stock' => 4,
            'category_id'  => 1, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 11.50],
            2 => ['prix' => 30.10],  
            3 => ['prix' => 36.85], 
            4 => ['prix' => 40.00], 
            5 => ['prix' => 20.40], 
            6 => ['prix' => 40.00], 
            7 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Mario vs Donkey',
            'description' => 'Enfin, on peut également ajouter à la liste des défauts les joutes avec Donkey Kong. Si l’on peut saluer l’esprit parfaitement retranscrit du jeu de 1981, 
            ces affrontements (il y en a presque 20) ne se distinguent que par le monde dans lequel ils sont situés. Il faut jouer avec la restriction locale 
            mais il s’agit toujours de mettre la tête au carré à DK en lui lançant des objets.',
            'image' => 'mariovsdonkey.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 20.40,
            'stock' => 4,
            'category_id'  => 4, 
        ]);
        $produit->plateformes()->attach([7]);
        
        $produit = Produits::create([
            'nom' => 'Mario Kart 8 Deluxe',
            'description' => 'Mario Kart 8 sur Switch est un jeu de course coloré et délirant qui reprend les personnages phares des grandes licences Nintendo. 
            Le joueur peut y affronter ses amis dans différents modes et types de coupes et a accès à 32 circuits.',
            'image' => 'mariokartdeluxe.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 55.40,
            'stock' => 2,
            'category_id'  => 6, 
        ]);
        $produit->plateformes()->attach([7]);

        
        $produit = Produits::create([
            'nom' => 'Super Mario Bros Wonder',
            'description' => 'C’est tout d’abord une intrigue simple qu’ils ont en commun. Dans le jeu Nintendo Switch, Mario, Peach et compagnie se rendent en visite officielle au Royaume des Fleurs. 
            Une première ! Mais lors de la cérémonie officielle avec le prince Florian, Bowser vient jouer les perturbateurs : il vient de s’approprier la Fleur des Prodiges. Le roi des Koopas sème la destruction sur la contrée avec son nouveau pouvoir et c’est, encore une fois,
             au plombier moustachu de remédier à la situation.',
            'image' => 'mariobros.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 22.40,
            'stock' => 2,
            'category_id'  => 4, 
        ]);
        $produit->plateformes()->attach([7]);

        
        $produit = Produits::create([
            'nom' => 'Just Cause 4',
            'description' => 'Améliorez votre expérience Just Cause 4 avec l\'Édition Gold ! Dans Just Cause 4, 
            l\'agent solitaire Rico Rodriguez se rend à Solís afin de découvrir la vérité sur son passé, quoi qu\'il en coûte. Plongez dans un monde ouvert bourré d\'action et semez le chaos avec une grande variété d\'armes, 
            de véhicules et d\'équipement. Enfilez votre wingsuit, équipez-vous de votre grappin entièrement personnalisable et préparez-vous à déchaîner les éléments !',
            'image' => 'justcause.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 35.40,
            'stock' => 4,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            3 => ['prix' => 40.00], 
            4 => ['prix' => 35.40], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 40.00], 
        ]);

        $produit = Produits::create([
            'nom' => 'Ilusion Island',
            'description' => 'Rejoins Mickey et ses amis pour explorer l’île mystérieuse de Monoth, lors d’une quête où tu devras récupérer trois livres mystiques et sauver un monde du désastre !
            Disney Illusion Island avec Mickey et ses amis inclut le jeu de base ainsi que les contenus additionnels téléchargeables Keeper Up, Mystère à Monoth et le tout nouveau C.A.S.H. avec Picsou ! 
            Joue les rôles de Mickey et ses amis Choisis ton personnage préféré et débloque des capacités spéciales',
            'image' => 'ilusionisland.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 11.40,
            'stock' => 5,
            'category_id'  => 4, 
        ]);
        $produit->plateformes()->attach([7]);

        $produit = Produits::create([
            'nom' => 'Greedfall The Dying World II',
            'description' => 'GreedFall 2 est un jeu vidéo de rôle d’action joué à la troisième personne. 
            Le joueur prend le contrôle d’un membre d’une tribu indigène sur l’île de Teer Fradee, qui est enlevé par les forces du continent qui cherchent à coloniser l’île. 
            Le jeu se déroule sur le continent de Gacane, un monde ouvert qui peut être exploré librement.',
            'image' => 'greedfall.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 27.40,
            'stock' => 5,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 35.40],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 44.40], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 22.00],
        ]);

        $produit = Produits::create([
            'nom' => 'Forza Horizon 4',
            'description' => 'Forza Horizon 4 est un jeu de course international ouvert où les joueurs s\'affrontent contre d\'autres joueurs qui sont en ligne, 
            mais d\'une manière libre qui signifie que vous n\'avez pas à vous engager avec eux si vous vous sentez bien seul. Le jeu peut également être joué hors ligne',
            'image' => 'forza.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 14.40,
            'stock' => 8,
            'category_id'  => 6, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 35.40],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 22.00],
            7 => ['prix' => 14.00],
        ]);

        $produit = Produits::create([
            'nom' => 'Final Fantasy XVI',
            'description' => 'L\'hégémonie des cristaux contrôle la destinée du monde depuis trop longtemps. Cette histoire est celle d\'une lutte pour s\'en émanciper. 
            Cinq nations se disputent les Cristaux-mères, sources de pouvoir et de bienfaits. Quand ce fragile équilibre faiblit, leurs Primordiaux vont se déchaîner pour parvenir à leurs fins. 
            Le jeune Clive Rosfield a perdu sa patrie et son frère dans les tourments de la guerre',
            'image' => 'finalfantasy.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 54.70,
            'stock' => 8,
            'category_id'  => 2, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 54.70],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Elden Ring Shadow Of The Erdtree',
            'description' => 'Shadow of the Erdtree est une extension pour ELDEN RING, sacré jeu de l\'année en 2022. '
            . 'Shadow of the Erdtree invite les joueurs à se plonger dans son atmosphère sombre et intense, et à poursuivre leur quête avec une liberté, '
            . 'd\'exploration totale qui leur permettra de progresser à leur propre rythme. '
            . 'De nouvelles régions immersives aux innombrables secrets. Dès sa création, le Royaume des ombres a été scellé et coupé de l\'Entre-terre.',
            'image' => 'eldenring.webp', // 📷 Chemin relatif vers l'image dans /storage ou /public
            'prix' => 35.40,
            'stock' => 25,
            'category_id'  => 1, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 35.40],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Cyberpunk2077',
            'description' => 'Cyberpunk 2077 est un jeu d’action-aventure en monde ouvert qui se déroule à Night City, '
            . 'une mégalopole obsédée par le pouvoir, la séduction et les modifications corporelles. Vous incarnez V, '
            . 'mercenaire hors-la-loi à la recherche d’un implant unique qui serait la clé de l’immortalité.',
            'image' => 'cyberpunk.webp',
            'prix' => 45.70,
            'stock' => 50,
            'category_id'  => 2, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 45.70],
            3 => ['prix' => 35.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 26.50], 
        ]);
       
        $produit = Produits::create([
            'nom' => 'Civilazation VI',
            'description' => 'Civilization VI propose de nouvelles façons d\'interagir avec votre monde 
            : les villes s\'étendent désormais réellement sur la carte, la recherche active dans les domaines de la technologie et de la culture débloquent de nouvelles possibilités,
             et les chefs rivaux poursuivent leurs propres objectifs en fonction de leurs caractéristiques historiques, alors que vous vous engagez dans l\'une de cinq voies vers la victoire dans le jeu',
            'image' => 'civilizationVI.webp',
            'prix' => 14.70,
            'stock' => 50,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            6 => ['prix' => 22.00],
            7 => ['prix' => 14.70],
        ]);
        
        $produit = Produits::create([
            'nom' => 'Call Of Duty Black Ops 6',
            'description' => 'Contraint de contourner les règles. Traqué par ses pairs. Découvrez Call of Duty®: Black Ops 6.Développé par Treyarch et Raven, Black Ops 6 est un jeu d\'action et d\'espionnage qui se déroule au début des années 90,
             une période de transition et de bouleversements sur la scène politique mondiale, caractérisée par la fin de la guerre froide et l\'émergence des États-Unis en tant que superpuissance',
            'image' => 'call-of-duty.webp',
            'prix' => 34.20,
            'stock' => 65,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 34.20],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Bordelands 3',
            'description' => 'L\'édition Ultimate de Borderlands 3, c\'est l\'expérience totale de Borderlands 3, avec le jeu de base récompensé par la critique, 
            les 6 contenus additionnels et tous les packs cosmétiques bonus ! Explorez différents mondes avec jusqu\'à 3 autres Chasseurs de l\'Arche, des brutasses ultimes.Le Season Pass inclut 4 campagnes additionnelles :Le Casse du Beau Jackpot',
            'image' => 'bordeland.webp',
            'prix' => 24.45,
            'stock' => 70,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            1 => ['prix' => 27.40], 
            2 => ['prix' => 35.40],
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 24.45], 
            6 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Avowed',
            'description' => 'Bienvenue dans les Terres vivantes, une mystérieuse île où vous attendent des aventures et des dangers.
            Avowed est un RPG à la première personne développé par l\'équipe primée d\'Obsidian Entertainment. 
            Il se déroule dans le monde fictif d\'Eora que les joueurs ont pu découvrir dans la franchise Pillars of Eternity',
            'image' => 'avowed.webp',
            'prix' => 24.45,
            'stock' => 75,
            'category_id'  => 2, 
        ]);
        $produit->plateformes()->attach([
            4 => ['prix' => 14.40], 
            5 => ['prix' => 24.45], 
            6 => ['prix' => 26.50], 
        ]);
        
        $produit = Produits::create([
            'nom' => 'Assetto Corsa',
            'description' => 'Voici la version la plus complète du simulateur de conduite unanimement salué, 
            contenant toutes les DLC et mises à jour sorties jusqu’à présent (Dream Pack 1-2-3, Tripl3Pack, Porsche Pack 1-2-3, 
            Red Pack, Ready To Race, Pack Japon et Ferrari 70ème anniversaire). Choisissez parmi 178 véhicules',
            'image' => 'asseto.webp',
            'prix' => 21.12,
            'stock' => 45,
            'category_id'  => 6, 
        ]);
        $produit->plateformes()->attach([
            3 => ['prix' => 40.00], 
            4 => ['prix' => 14.40], 
            5 => ['prix' => 21.12], 
            6 => ['prix' => 26.50], 
        ]);
        
        
        $produit = Produits::create([
            'nom' => 'Assassin screed III',
            'description' => 'Revivez la Révolution Américaine ou vivez-la pour la première fois dans Assassin\'s Creed® III Remastered, avec des graphismes améliorés et de nouvelles mécaniques de jeu. 
            Le jeu inclut Assassin\'s Creed Liberation Remastered et tous les DLC solo. BATTEZ-VOUS POUR LA LIBERTÉ 1775.',
            'image' => 'assassinscreed3.webp',
            'prix' => 15.00,
            'stock' => 19,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            4 => ['prix' => 15.00], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 22.00],
            7 => ['prix' => 14.00],
        ]);
        
        $produit = Produits::create([
            'nom' => 'Assassin screed Shadow',
            'description' => 'PLONGEZ DANS LE JAPON FÉODAL Explorez le monde ouvert captivant du Japon féodal, des villes fortifiées spectaculaires aux ports animés en passant par les paisibles sanctuaires et les paysages dévastés par les combats. 
            Bravez des conditions météorologiques imprévisibles, des changements de saisons et des environnements réactifs. 
            MAÎTRISEZ DES STYLES DE JEU COMPLÉMENTAIRES Incarnez Naoe, une Assassin shinobi, et Yasuke, un samouraï légendaire.',
            'image' => 'assassinscreedshadow.webp',
            'prix' => 45.00,
            'stock' => 23,
            'category_id'  => 3, 
        ]);
        $produit->plateformes()->attach([
            4 => ['prix' => 45.00], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 22.00],
        ]);
        
        $produit = Produits::create([
            'nom' => 'Abiotic Factor',
            'description' => 'HISTOIREGATE dirige un réseau mondial de laboratoires secrets ,
            dans lesquels les plus grands esprits du monde mènent des recherches dans tous les champs d\'études scientifiques et les domaines au-delà.En tant qu\'employé de GATE, 
            vous repoussez les limites de la connaissance humaine et cherchez à expliquer l\'inexplicable, y compris les anomalies et entités paranormales',
            'image' => 'abioticfactor.webp',
            'prix' => 18.00,
            'stock' => 23,
            'category_id'  => 1, 
        ]);
        $produit->plateformes()->attach([6]);
        
        $produit = Produits::create([
            'nom' => '7 Days To Die',
            'description' => 'Combien de temps allez-vous survivre?Avec près de 18 millions d\'exemplaires vendus, 7 Days est un pilier des jeux de survie dont les possibilités au niveau de la fabrication 
            d\'objets et de construction de monde sont encore inégalées. Se déroulant dans un monde post-apocalyptique impitoyable et brutal infesté par les morts-vivants, 
            7 Days est un jeu à monde ouvert entre le jeu de tir à la première personne, le survival horror',
            'image' => '7daystodie.webp',
            'prix' => 18.00,
            'stock' => 23,
            'category_id'  => 5, 
        ]);
        $produit->plateformes()->attach([
            3 => ['prix' => 15.00], 
            4 => ['prix' => 15.00], 
            5 => ['prix' => 26.50], 
            6 => ['prix' => 18.00],
        ]);
       
    }
}