import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FileText, Loader2, Shuffle, Zap } from "lucide-react";

const Step3GenerationApercu = ({
  // Sélections actuelles
  selectedMatiere,
  selectedNiveau,
  selectedChapitre,
  typeDoc,
  difficulte,
  nbExercices,
  // État de génération
  isGenerating,
  currentDocument,
  onGenerate,
  onVaryExercise,
  isLoading = false
}) => {
  const canGenerate = selectedMatiere && selectedNiveau && selectedChapitre && typeDoc && difficulte && nbExercices;

  return (
    <div className="space-y-6">
      {/* Section Génération */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Génération du document
          </CardTitle>
          <CardDescription className="text-green-50">
            Créez votre document personnalisé avec l'intelligence artificielle
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {canGenerate ? (
            <div className="space-y-4">
              {/* Résumé de la configuration */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Configuration sélectionnée :</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Matière :</span>
                    <span className="ml-2 font-medium">{selectedMatiere}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Niveau :</span>
                    <span className="ml-2 font-medium">{selectedNiveau}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type :</span>
                    <span className="ml-2 font-medium">{typeDoc}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Difficulté :</span>
                    <span className="ml-2 font-medium">{difficulte}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Chapitre :</span>
                    <span className="ml-2 font-medium">{selectedChapitre}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Exercices :</span>
                    <span className="ml-2 font-medium">{nbExercices}</span>
                  </div>
                </div>
              </div>

              {/* Bouton de génération */}
              <Button
                onClick={onGenerate}
                disabled={isGenerating || isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Générer le document
                  </>
                )}
              </Button>

              {isGenerating && (
                <div className="text-center text-sm text-gray-600">
                  <p>🤖 L'IA prépare vos exercices personnalisés...</p>
                  <p className="text-xs text-gray-500 mt-1">Cela peut prendre quelques secondes</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Configuration incomplète</h3>
              <p className="text-gray-500 mb-4">
                Veuillez compléter les étapes précédentes pour générer votre document
              </p>
              <div className="text-left max-w-md mx-auto">
                <h4 className="font-medium text-gray-700 mb-2">Éléments manquants :</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {!selectedMatiere && <li>• Matière</li>}
                  {!selectedNiveau && <li>• Niveau</li>}
                  {!selectedChapitre && <li>• Chapitre</li>}
                  {!typeDoc && <li>• Type de document</li>}
                  {!difficulte && <li>• Difficulté</li>}
                  {!nbExercices && <li>• Nombre d'exercices</li>}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Aperçu du document généré */}
      {currentDocument && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Aperçu du document
            </CardTitle>
            <CardDescription className="text-indigo-50">
              Prévisualisez le contenu généré
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {currentDocument.type_doc.charAt(0).toUpperCase() + currentDocument.type_doc.slice(1)}
                  </h3>
                  <p className="text-gray-600">{currentDocument.matiere} - {currentDocument.niveau}</p>
                  <p className="text-sm text-gray-500">{currentDocument.chapitre}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">{currentDocument.difficulte}</Badge>
                  <p className="text-sm text-gray-500">{currentDocument.nb_exercices} exercices</p>
                </div>
              </div>
            </div>

            {/* Exercises Preview */}
            <Tabs defaultValue="sujet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sujet">Sujet</TabsTrigger>
                <TabsTrigger value="corrige">Corrigé</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sujet" className="space-y-4 mt-4">
                {currentDocument.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <span className="font-bold text-blue-600 mr-2">Exercice {index + 1}</span>
                          <Badge variant="secondary" className="text-xs">{exercise.type}</Badge>
                          <Badge variant="outline" className="text-xs ml-2">{exercise.difficulte}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onVaryExercise(index)}
                          className="text-gray-500 hover:text-gray-700"
                          title="Varier cet exercice"
                        >
                          <Shuffle className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-gray-900 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: exercise.enonce }}></div>
                      {/* Display geometric schema if present */}
                      {exercise.schema_img && (
                        <div className="mt-4 text-center">
                          <img 
                            src={exercise.schema_img} 
                            alt="Schéma géométrique" 
                            className="max-w-full h-auto mx-auto border border-gray-300 rounded-lg shadow-sm"
                            style={{ maxHeight: '400px' }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="corrige" className="space-y-4 mt-4">
                {currentDocument.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <span className="font-bold text-green-600 mr-2">Exercice {index + 1} - Solution</span>
                      </div>
                      <div className="space-y-2">
                        {exercise.solution.etapes.map((etape, etapeIndex) => (
                          <div key={etapeIndex} className="text-sm">
                            <span className="font-medium text-gray-700">Étape {etapeIndex + 1}:</span>
                            <span className="ml-2 text-gray-900" dangerouslySetInnerHTML={{ __html: etape }}></span>
                          </div>
                        ))}
                        <div className="mt-3 p-2 bg-green-50 rounded">
                          <strong className="text-green-800">Résultat :</strong> 
                          <span className="ml-2 text-green-900" dangerouslySetInnerHTML={{ __html: exercise.solution.resultat }}></span>
                        </div>
                        {exercise.bareme.length > 0 && (
                          <div className="mt-3 p-2 bg-blue-50 rounded">
                            <strong className="text-blue-800">Barème :</strong>
                            <ul className="list-disc list-inside mt-1 text-sm">
                              {exercise.bareme.map((item, i) => (
                                <li key={i} className="text-blue-900">
                                  {item.etape}: {item.points} pts
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Step3GenerationApercu;