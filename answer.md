**Résolution d'une Équation Non Linéaire à Une Variable en C++**

Pour résoudre une équation non linéaire à une variable, nous pouvons utiliser la méthode de Newton-Raphson. Voici un exemple de code C++ qui utilise cette méthode :

```cpp
#include <iostream>
#include <cmath>

// Définition de la fonction et de sa dérivée
double f(double x) {
    return x*x + 2*x - 3;
}

double df_dx(double x, double h = 1e-7) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

// Méthode de Newton-Raphson pour résoudre une équation non linéaire
double newton_raphson(double (*f)(double), double (*df_dx)(double, double), double x0, double tol = 1e-5, int max_iter = 1000) {
    if (max_iter == 0) {
        throw std::invalid_argument("Nombre maximum d'itérations atteint");
    }

    double x = x0;
    for (int i = 0; i < max_iter; ++i) {
        // Calcul de la valeur de l'équation à x
        double fx = f(x);
        
        // Calcul de la dérivée à x
        double dfx = df_dx(x, h);

        // Vérification de la tolérance
        if (std::abs(fdx) < tol || std::abs(x_next - x) < tol) {
            break;
        }

        // Mise à jour de x en utilisant la formule de Newton-Raphson
        double x_next = x - fx / dfx;

        // Mise à jour de x
        x = x_next;
    }

    return x;
}

int main() {
    try {
        double x0 = 1.0; // Approximation initiale de la solution

        // Résolution de l'équation non linéaire avec df_dx donnée
        double df_dx_given = [](double x, double h) { return (x*x + 2*x - 3 + h) / (2.0 * h); };
        std::cout << "Solution approximée avec df_dx donnée : " << newton_raphson(f, df_dx_given, x0) << std::endl;

        // Résolution de l'équation non linéaire sans df_dx
        double df_dx_approx = [](double x, double h) { return (f(x + 2*h) - f(x)) / (4.0 * h); };
        std::cout << "Solution approximée sans df_dx : " << newton_raphson(f, df_dx_approx, x0) << std::endl;
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
        return 1;
    }

    return 0;
}
```

Dans cet exemple, nous définissons une fonction `f(x) = x^2 + 2x - 3` et deux fonctions `df_dx_given(x)` et `df_dx_approx(x)` qui approximent la dérivée de la fonction. Nous utilisons ensuite la méthode de Newton-Raphson pour résoudre l'équation non linéaire avec ou sans df_dx donnée.